import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FeedActions from '../actions/feed.actions';
import { Injectable, inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { FeedService } from '../../shared/services/feed.service';

@Injectable()
export class FeedEffects {
  getPosts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.getPosts),
        exhaustMap(() =>
          this.feedService
            .getPosts()
            .pipe(map((posts) => FeedActions.getPostsSuccess({ posts }))),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  getAds$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.getAds),
        exhaustMap(() =>
          this.feedService
            .getAds()
            .pipe(map((ads) => FeedActions.getAdsSuccess({ ads }))),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  constructor(
    private feedService: FeedService,
    private actions$: Actions,
  ) {}
}
