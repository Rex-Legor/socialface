import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { UIModule } from '../../shared/ui/ui.module';
import { FeedState } from '../../state/reducers/feed.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { IFeedPost, IPost } from '../../shared/models/feed.model';
import { getAds, getPosts } from '../../state/actions/feed.actions';
import {
  getFeedCombinedPosts,
  getFeedLoading,
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
  feedPosts: IFeedPost[] = [];
  user: IUser | null = null;

  loading$: Observable<boolean>;
  postsSub: Subscription;
  userSubscription: Subscription;

  displayMenu = false;
  displayFriends = false;

  constructor(
    private store: Store<FeedState>,
    private authStore: Store<AuthState>,
  ) {
    this.getData();

    this.loading$ = this.store.pipe(select(getFeedLoading));

    this.postsSub = this.store
      .pipe(select(getFeedCombinedPosts))
      .subscribe((posts) => {
        this.feedPosts = posts;
      });

    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user = user;
      });
  }

  getData() {
    this.store.dispatch(getPosts());
    this.store.dispatch(getAds());
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  toggleDisplayMenu() {
    this.displayMenu = !this.displayMenu;
  }

  toggleDisplayFrieds() {
    this.displayFriends = !this.displayFriends;
  }
}
