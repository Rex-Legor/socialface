import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';

import { IconsModule } from '../../shared/icons/icons.module';
import { IPost, IPostComment } from '../../shared/models/feed.model';
import { IUser } from '../../shared/models/user.model';
import { UIModule } from '../../shared/ui/ui.module';
import {
  getAds,
  getPosts,
  postComment,
  postLike,
} from '../../state/actions/feed.actions';
import { AuthState } from '../../state/reducers/auth.reducer';
import { FeedState } from '../../state/reducers/feed.reducer';
import { getUser } from '../../state/selectors/auth.selector';
import {
  getFeedCombinedPosts,
  getFeedErrorFetching,
  getFeedLoading,
  getFeedTotalPages,
} from '../../state/selectors/feed.selector';

/**
 * This page component contains the key piece of the application: it displays
 * posts and displays an advertising after 4 posts.
 * Users can interact with the posts by liking and comment on them.
 *
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-feed',
  standalone: true,
  imports: [CommonModule, UIModule, IconsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FeedComponent implements OnDestroy {
  feedPosts = signal<IPost[]>([]);
  user = signal<IUser | null>(null);

  errorFetching$: Observable<boolean>;
  postsSub: Subscription;
  userSubscription: Subscription;
  totalPagesSubscription: Subscription;
  loadingSubscription: Subscription;

  displayMenu = signal(false);
  displayFriends = signal(false);
  displayPostPlaceholder = signal(true);
  loading = signal(false);
  currentPage = signal(1);
  totalPages = signal(1);

  /**
   * This constructor initializes some important variables containing information obtained from the stores,
   * that includes posts, ads, loading state, total post pages and user data.
   *
   * @param store - Injected feed store for managing posts and ads
   * @param authStore - Injected auth store for managing user
   */
  constructor(
    private store: Store<FeedState>,
    private authStore: Store<AuthState>,
  ) {
    this.getData();

    this.loadingSubscription = this.store
      .pipe(select(getFeedLoading))
      .subscribe((loading) => {
        this.loading.set(loading);
      });
    this.errorFetching$ = this.store.pipe(
      select(getFeedErrorFetching),
      tap((error) => {
        if (error && this.feedPosts().length == 0) this.currentPage.set(1);
      }),
    );

    this.totalPagesSubscription = this.store
      .pipe(select(getFeedTotalPages))
      .subscribe((totalPages) => this.totalPages.set(totalPages));
    this.postsSub = this.store
      .pipe(select(getFeedCombinedPosts))
      .subscribe((posts) => {
        this.feedPosts.set(posts);
      });

    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user.set(user);
      });
  }

  /**
   * For unsubscribe multiple subscriptions.
   */
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userSubscription.unsubscribe();
    this.totalPagesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  /** This is used for pagination purposes, when the user scrolls to the bottom of the screen we will get more posts. */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (pos + 180 >= max) {
      this.getPosts();
    }
  }

  /** Calls for more posts using dispatch. */
  getPosts() {
    if (!this.loading() && this.currentPage() <= this.totalPages()) {
      this.store.dispatch(getPosts({ pageNumber: this.currentPage() }));
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  /** Calls for posts and ads using dispatch. */
  getData() {
    this.getPosts();
    this.store.dispatch(getAds());
  }

  /**
   * When the screen width is below 1280 the menu sidebar gets hidden and a new button gets displayed on the header at the left,
   * clicking that button displays/hides the menu sidebar.
   */
  toggleDisplayMenu() {
    const displayMenu = this.displayMenu();
    this.displayMenu.set(!displayMenu);
  }

  /**
   * When the screen width is below 1024 the friends sidebar gets hidden and a new button
   * gets displayed on the header at the right, clicking that button displays/hides the friends sidebar.
   */
  toggleDisplayFrieds() {
    const displayFriends = this.displayFriends();
    this.displayFriends.set(!displayFriends);
  }

  /**
   * Self descriptive.
   * @param post
   */
  likePost(post: IPost) {
    const newPost = { ...post };
    newPost.liked = !post.liked;
    this.store.dispatch(postLike({ post: newPost }));
  }

  /**
   * Self descriptive.
   * @param post
   * @param comment
   */
  commentPost(post: IPost, comment: string) {
    const newPost = { ...post };
    const newComment: IPostComment = {
      comment,
      postId: post.id,
      userData: this.user() as IUser,
    };
    newPost.comments = post.comments
      ? post.comments.concat([newComment])
      : [newComment];

    this.store.dispatch(postComment({ post: newPost }));
  }

  /**
   * Used for tracking rendered posts by id in order to avoid unnecesary re-renders.
   * @param index
   * @param item
   * @returns post id
   */
  // eslint-disable-next-line class-methods-use-this
  trackByPostId = (index: number, item: IPost) => item.id;
}
