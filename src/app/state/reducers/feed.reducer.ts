import { createReducer, on } from '@ngrx/store';
import * as FeedActions from '../actions/feed.actions';
import { IAd, IPost } from '../../shared/models/feed.model';

export interface FeedState {
  posts: IPost[];
  ads: IAd[];
  loading: boolean;
}

export const initialState: FeedState = {
  posts: [],
  ads: [],
  loading: true,
};

export const feedReducer = createReducer(
  initialState,
  on(FeedActions.getPosts, (state) => ({
    ...state,
    loading: true,
  })),

  on(FeedActions.getAds, (state) => ({
    ...state,
    loading: true,
  })),

  on(FeedActions.getPostsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      posts: action.posts,
    };
  }),

  on(FeedActions.getAdsSuccess, (state, action) => ({
    ...state,
    loading: false,
    ads: action.ads,
  })),
);
