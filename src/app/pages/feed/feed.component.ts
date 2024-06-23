import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'sf-feed',
  standalone: true,
  imports: [CommonModule, UIModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnDestroy {
  feedPosts: IFeedPost[] = [];

  loading$: Observable<boolean>;
  postsSub: Subscription;

  constructor(private store: Store<FeedState>) {
    this.getData();

    this.loading$ = this.store.pipe(select(getFeedLoading));

    this.postsSub = this.store
      .pipe(select(getFeedCombinedPosts))
      .subscribe((posts) => {
        this.feedPosts = posts;
      });
  }

  getData() {
    this.store.dispatch(getPosts());
    this.store.dispatch(getAds());
  }

  ngOnDestroy() {}
}
