import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { UIModule } from '../../shared/ui/ui.module';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../state/reducers/auth.reducer';
import { FeedState } from '../../state/reducers/feed.reducer';
import { Observable, Subscription } from 'rxjs';
import { IFeedPost, IPost } from '../../shared/models/feed.model';
import { IUser } from '../../shared/models/user.model';
import { getPosts, getAds } from '../../state/actions/feed.actions';
import { getUser } from '../../state/selectors/auth.selector';
import {
  getFeedLoading,
  getFeedCombinedPosts,
  getFeedPosts,
} from '../../state/selectors/feed.selector';
import { IconsModule } from '../../shared/icons/icons.module';

@Component({
  selector: 'sf-profile',
  standalone: true,
  imports: [CommonModule, UIModule, IconsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  posts: IPost[] = [];
  user: IUser | null = null;

  loading$: Observable<boolean>;
  postsSub: Subscription;
  userSubscription: Subscription;

  displayMenu = false;

  constructor(
    private store: Store<FeedState>,
    private authStore: Store<AuthState>,
  ) {
    this.getData();

    this.loading$ = this.store.pipe(select(getFeedLoading));

    this.postsSub = this.store.pipe(select(getFeedPosts)).subscribe((posts) => {
      this.posts = posts.filter(
        ({ userData }) =>
          userData.firstName == this.user?.firstName &&
          userData.lastName == this.user.lastName,
      );
    });

    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user = user;
      });
  }

  getData() {
    this.store.dispatch(getPosts());
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  toggleDisplayMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
