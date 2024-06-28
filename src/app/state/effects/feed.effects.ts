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
          this.feedService.getPosts().pipe(
            map((posts) => FeedActions.getPostsSuccess({ posts })),
            catchError(() => of(FeedActions.getPostsError())),
          ),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  getAds$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.getAds),
        exhaustMap(() =>
          this.feedService.getAds().pipe(
            map((ads) => FeedActions.getAdsSuccess({ ads })),
            catchError(() => of(FeedActions.getAdsError())),
          ),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  postComment$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.postComment),
        exhaustMap(({ post }) =>
          this.feedService
            .postComment(post)
            .pipe(map(() => FeedActions.postCommentSuccess({ post }))),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  postLike$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.postLike),
        exhaustMap(({ post }) =>
          this.feedService
            .postLike(post)
            .pipe(map(() => FeedActions.postLikeSuccess({ post }))),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  constructor(
    private feedService: FeedService,
    private actions$: Actions,
  ) {}
}
