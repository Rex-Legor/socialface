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

  constructor(
    private store: Store<FeedState>,
    private authStore: Store<AuthState>,
  ) {
    this.getData();

    this.loading$ = this.store.pipe(select(getFeedLoading));
    this.errorFetching$ = this.store.pipe(select(getFeedErrorFetching));

    this.postsSub = this.store.pipe(select(getFeedPosts)).subscribe((posts) => {
      this.posts.set(posts);
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
  }

  getData() {
    this.store.dispatch(getPosts({ pageNumber: 1 }));
  }

  toggleDisplayMenu() {
    this.displayMenu.set(!this.displayMenu);
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
