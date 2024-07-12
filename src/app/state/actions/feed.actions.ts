import { createAction, props } from '@ngrx/store';

import { IAd, IPost } from '../../shared/models/feed.model';

export enum FeedActionTypes {
  GetPosts = '[Feed Page] Get Posts',
  GetPostsSuccess = '[Feed Page] Get Posts Success',
  GetPostsError = '[Feed Page] Get Posts Error',
  GetAds = '[Feed Page] Get Ads',
  GetAdsSuccess = '[Feed Page] Get Ads Success',
  GetAdsError = '[Feed Page] Get Ads Error',
  PostComment = '[Feed Page] Post Comment Success',
  PostCommentSuccess = '[Feed Page] Post Comment',
  PostLike = '[Feed Page] Post Like',
  PostLikeSuccess = '[Feed Page] Post Like Success',
}

/**
 * Called from feed effetcs for making an api call.
 */
export const getPosts = createAction(
  FeedActionTypes.GetPosts,
  props<{ pageNumber: number; userId?: string }>(),
);

/**
 * Updates the feed reducer with the obtained posts from the feed effects.
 */
export const getPostsSuccess = createAction(
  FeedActionTypes.GetPostsSuccess,
  props<{ posts: IPost[]; totalPages: number; resetPosts?: boolean }>(),
);

/** Updates the feed reducer indicating there was an error in the api call made from feed effects */
export const getPostsError = createAction(FeedActionTypes.GetPostsError);

/**
 * Called from feed effetcs for making an api call.
 */
export const getAds = createAction(FeedActionTypes.GetAds);

/**
 * Called from feed effetcs for making an api call.
 */
export const postComment = createAction(
  FeedActionTypes.PostComment,
  props<{ post: IPost }>(),
);

/**
 * Called from feed effetcs for making an api call.
 */
export const postLike = createAction(
  FeedActionTypes.PostLike,
  props<{ post: IPost }>(),
);

/**
 * Updates the feed reducer with the obtained ads from the feed effects.
 */
export const getAdsSuccess = createAction(
  FeedActionTypes.GetAdsSuccess,
  props<{ ads: IAd[] }>(),
);

/** Updates the feed reducer indicating there was an error in the api call made from feed effects */
export const getAdsError = createAction(FeedActionTypes.GetAdsError);

/** Updates the feed reducer with the updated post. */
export const postCommentSuccess = createAction(
  FeedActionTypes.PostCommentSuccess,
  props<{ post: IPost }>(),
);

/** Updates the feed reducer with the updated post. */
export const postLikeSuccess = createAction(
  FeedActionTypes.PostLikeSuccess,
  props<{ post: IPost }>(),
);
