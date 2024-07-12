import { createReducer, on } from '@ngrx/store';

import { IAd, IPost } from '../../shared/models/feed.model';
import * as FeedActions from '../actions/feed.actions';

export interface FeedState {
  posts: IPost[];
  ads: IAd[];
  loading: boolean;
  errorFetching: boolean;
  totalPostPages: number;
}

export const initialState: FeedState = {
  posts: [],
  ads: [],
  loading: true,
  errorFetching: false,
  totalPostPages: 1,
};

/**
 * Takes a post to replace the original one, it can be an ad mapped as a post, in that case
 * this function will replace the ad with the new post.
 * @param postToUpdate
 * @param state
 * @returns
 */
const mapPosts = (postToUpdate: IPost, state: FeedState) => {
  const postsToMap = postToUpdate.isSponsored ? state.ads : state.posts;

  const result = postsToMap.map((post) => {
    if (post.id == postToUpdate.id) {
      if (postToUpdate.isSponsored) {
        const adToUpdate = state.ads.find(({ id }) => id == postToUpdate.id);
        return {
          ...adToUpdate,
          ...postToUpdate,
        };
      }
      return postToUpdate;
    }

    return post;
  });

  if (postToUpdate.isSponsored) return { ads: result as IAd[] };
  return { posts: result as IPost[] };
};

/**
 * Creates a reducer for the feed.
 */
export const feedReducer = createReducer(
  initialState,
  on(FeedActions.getPosts, (state) => ({
    ...state,
    loading: true,
    errorFetching: false,
  })),

  on(FeedActions.getAds, (state) => ({
    ...state,
    loading: true,
    errorFetching: false,
  })),

  on(FeedActions.postComment, (state) => ({
    ...state,
  })),

  on(FeedActions.postLike, (state) => ({
    ...state,
  })),

  on(FeedActions.getPostsSuccess, (state, action) => ({
    ...state,
    loading: false,
    posts: action.resetPosts ? action.posts : state.posts.concat(action.posts),
    totalPostPages: action.totalPages,
  })),
  on(FeedActions.getPostsError, (state) => ({
    ...state,
    loading: false,
    errorFetching: true,
  })),
  on(FeedActions.getAdsSuccess, (state, action) => ({
    ...state,
    loading: false,
    ads: action.ads,
  })),
  on(FeedActions.getAdsError, (state) => ({
    ...state,
    loading: false,
    errorFetching: true,
  })),
  on(FeedActions.postCommentSuccess, (state, action) => ({
    ...state,
    ...mapPosts(action.post, state),
  })),

  on(FeedActions.postLikeSuccess, (state, action) => ({
    ...state,
    ...mapPosts(action.post, state),
  })),
);
