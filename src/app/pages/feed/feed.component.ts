import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { UIModule } from '../../shared/ui/ui.module';
import { FeedState } from '../../state/reducers/feed.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { IPost, IPostComment } from '../../shared/models/feed.model';
import {
  getAds,
  getPosts,
  postComment,
  postLike,
} from '../../state/actions/feed.actions';
import {
  getFeedCombinedPosts,
  getFeedErrorFetching,
  getFeedLoading,
  getFeedTotalPages,
} from '../../state/selectors/feed.selector';
import { getUser } from '../../state/selectors/auth.selector';
import { IUser } from '../../shared/models/user.model';
import { AuthState } from '../../state/reducers/auth.reducer';
import { IconsModule } from '../../shared/icons/icons.module';

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

  constructor(
    private store: Store<FeedState>,
    private authStore: Store<AuthState>,
  ) {
    this.getData();

    this.loadingSubscription = this.store
      .pipe(select(getFeedLoading))
      .subscribe((loading) => this.loading.set(loading));
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

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userSubscription.unsubscribe();
    this.totalPagesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

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

  getPosts() {
    if (!this.loading() && this.currentPage() <= this.totalPages()) {
      this.store.dispatch(getPosts({ pageNumber: this.currentPage() }));
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  getData() {
    this.getPosts();
    this.store.dispatch(getAds());
  }

  toggleDisplayMenu() {
    const displayMenu = this.displayMenu();
    this.displayMenu.set(!displayMenu);
  }

  toggleDisplayFrieds() {
    const displayFriends = this.displayFriends();
    this.displayFriends.set(!displayFriends);
  }

  likePost(post: IPost) {
    const newPost = { ...post };
    newPost.liked = !post.liked;
    this.store.dispatch(postLike({ post: newPost }));
  }

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

  trackByPostId = (index: number, item: IPost) => item.id;
}
