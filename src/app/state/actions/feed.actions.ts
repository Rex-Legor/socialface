import { Action, createAction, props } from '@ngrx/store';
import { IAd, IPost } from '../../shared/models/feed.model';

enum FeedActionTypes {
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

export const getPosts = createAction(
  FeedActionTypes.GetPosts,
  props<{ pageNumber: number; userId?: string }>(),
);
export const getPostsSuccess = createAction(
  FeedActionTypes.GetPostsSuccess,
  props<{ posts: IPost[]; totalPages: number; resetPosts?: boolean }>(),
);
export const getPostsError = createAction(FeedActionTypes.GetPostsError);
export const getAds = createAction(FeedActionTypes.GetAds);
export const postComment = createAction(
  FeedActionTypes.PostComment,
  props<{ post: IPost }>(),
);
export const postLike = createAction(
  FeedActionTypes.PostLike,
  props<{ post: IPost }>(),
);
export const getAdsSuccess = createAction(
  FeedActionTypes.GetAdsSuccess,
  props<{ ads: IAd[] }>(),
);
export const getAdsError = createAction(FeedActionTypes.GetAdsError);
export const postCommentSuccess = createAction(
  FeedActionTypes.PostCommentSuccess,
  props<{ post: IPost }>(),
);
export const postLikeSuccess = createAction(
  FeedActionTypes.PostLikeSuccess,
  props<{ post: IPost }>(),
);
