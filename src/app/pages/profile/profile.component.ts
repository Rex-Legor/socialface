import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { UIModule } from '../../shared/ui/ui.module';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../state/reducers/auth.reducer';
import { FeedState } from '../../state/reducers/feed.reducer';
import { Observable, Subscription } from 'rxjs';
import { IPost, IPostComment } from '../../shared/models/feed.model';
import { IUser } from '../../shared/models/user.model';
import {
  getPosts,
  getAds,
  postComment,
  postLike,
} from '../../state/actions/feed.actions';
import { getUser } from '../../state/selectors/auth.selector';
import {
  getFeedLoading,
  getFeedCombinedPosts,
  getFeedPosts,
  getFeedErrorFetching,
} from '../../state/selectors/feed.selector';
import { IconsModule } from '../../shared/icons/icons.module';

/**
 * Page component for displaying user profile information and user shared posts.
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-profile',
  standalone: true,
  imports: [CommonModule, UIModule, IconsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  posts = signal<IPost[]>([]);
  user = signal<IUser | null>(null);
  displayMenu = signal(false);

  loading$: Observable<boolean>;
  errorFetching$: Observable<boolean>;
  postsSub: Subscription;
  userSubscription: Subscription;

  /**
   * Gets loading and error properties from the feed store, it also
   * listens for the user posts and gets the user data.
   * @param store - Injects feed store.
   * @param authStore - Injects auth store.
   */
  constructor(
    private store: Store<FeedState>,
    private authStore: Store<AuthState>,
  ) {
    this.loading$ = this.store.pipe(select(getFeedLoading));
    this.errorFetching$ = this.store.pipe(select(getFeedErrorFetching));

    this.postsSub = this.store.pipe(select(getFeedPosts)).subscribe((posts) => {
      this.posts.set(posts);
    });

    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user.set(user);

        if (this.posts().length == 0) this.getData(`${user?.id}`);
      });
  }

  /**
   * Used to unsubscribe variables.
   */
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  /**
   * Calls for get user posts using dispatch.
   */
  getData(userId: string) {
    this.store.dispatch(getPosts({ pageNumber: 1, userId }));
  }

  /**
   * When the screen width is below 1280 the menu sidebar gets hidden and a new button gets displayed on the header at the left,
   * clicking that button displays/hides the menu sidebar.
   */
  toggleDisplayMenu() {
    this.displayMenu.set(!this.displayMenu());
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
  trackByPostId = (index: number, item: IPost) => item.id;
}
