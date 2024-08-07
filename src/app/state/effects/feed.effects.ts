import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, exhaustMap, map, of
} from 'rxjs';

import { FeedService } from '../../shared/services/feed.service';
import * as FeedActions from '../actions/feed.actions';

/**
 * Effects component.
 * Check NgRx effects for more information.
 *
 * @author Ricardo Legorreta Mendoza
 */
@Injectable()
export class FeedEffects {
  /**
   * effect function called automatically when dispatching FeedActions.getPost function.
   */
  getPosts$ = createEffect(
    () => this.actions$.pipe(
      ofType(FeedActions.getPosts),
      exhaustMap(({ pageNumber, userId }) => this.feedService.getPosts(pageNumber, userId).pipe(
        map(({ posts, totalPages }) => FeedActions.getPostsSuccess({
          posts,
          totalPages,
          resetPosts: pageNumber == 1,
        }),),
        catchError(() => of(FeedActions.getPostsError())),
      ),),
    ),
    { useEffectsErrorHandler: true },
  );

  /**
   * effect function called automatically when dispatching FeedActions.getAds function.
   */
  getAds$ = createEffect(
    () => this.actions$.pipe(
      ofType(FeedActions.getAds),
      exhaustMap(() => this.feedService.getAds().pipe(
        map((ads) => FeedActions.getAdsSuccess({ ads })),
        catchError(() => of(FeedActions.getAdsError())),
      ),),
    ),
    { useEffectsErrorHandler: true },
  );

  /**
   * effect function called automatically when dispatching FeedActions.postComment function.
   */
  postComment$ = createEffect(
    () => this.actions$.pipe(
      ofType(FeedActions.postComment),
      exhaustMap(({ post }) => this.feedService
        .postComment(post)
        .pipe(map(() => FeedActions.postCommentSuccess({ post }))),),
    ),
    { useEffectsErrorHandler: true },
  );

  /**
   * effect function called automatically when dispatching FeedActions.postLike function.
   */
  postLike$ = createEffect(
    () => this.actions$.pipe(
      ofType(FeedActions.postLike),
      exhaustMap(({ post }) => this.feedService
        .postLike(post)
        .pipe(map(() => FeedActions.postLikeSuccess({ post }))),),
    ),
    { useEffectsErrorHandler: true },
  );

  constructor(
    private feedService: FeedService,
    private actions$: Actions,
  ) {}
}
