import { Action, createAction, props } from '@ngrx/store';
import { IAd, IPost } from '../../shared/models/feed.model';

enum FeedActionTypes {
  GetPosts = '[Feed Page] Get Posts',
  GetPostsSuccess = '[Feed Page] Get Posts Success',
  GetAds = '[Feed Page] Get Ads',
  GetAdsSuccess = '[Feed Page] Get Ads Success',
}

export const getPosts = createAction(FeedActionTypes.GetPosts);
export const getPostsSuccess = createAction(
  FeedActionTypes.GetPostsSuccess,
  props<{ posts: IPost[] }>(),
);

export const getAds = createAction(FeedActionTypes.GetAds);
export const getAdsSuccess = createAction(
  FeedActionTypes.GetAdsSuccess,
  props<{ ads: IAd[] }>(),
);
