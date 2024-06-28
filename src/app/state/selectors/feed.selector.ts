import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from '../reducers/feed.reducer';
import { IPost } from '../../shared/models/feed.model';

export const feedSelectorKey = 'feed';

export const getFeedState = createFeatureSelector<FeedState>(feedSelectorKey);

export const getFeedLoading = createSelector(
  getFeedState,
  (state: FeedState) => state.loading,
);

export const getFeedErrorFetching = createSelector(
  getFeedState,
  (state: FeedState) => state.errorFetching,
);

export const getFeedPosts = createSelector(
  getFeedState,
  (state: FeedState) => state.posts,
);

export const getFeedAds = createSelector(
  getFeedState,
  (state: FeedState) => state.ads,
);

export const getFeedCombinedPosts = createSelector(
  getFeedState,
  (state: FeedState) => {
    const posts = state.posts;
    const ads = state.ads;
    const feedPosts: IPost[] = [];

    let adsIndex = 0;

    for (let index = 0; index < posts.length; index++) {
      const post = posts[index];

      feedPosts.push(post);

      if ((index + 1) % 4 == 0 && adsIndex < ads.length) {
        const ad = ads[adsIndex];

        feedPosts.push({
          id: ad.id,
          date: '',
          description: ad.description,
          picture: ad.picture,
          totalComments: ad.totalComments,
          totalLikes: ad.totalLikes,
          comments: ad.comments || [],
          liked: ad.liked,
          isSponsored: true,
          userData: {
            profilePicture: ad.companyPicture,
            lastName: '',
            firstName: ad.companyName,
            birthDate: '',
            country: '',
            email: '',
            id: '',
            notificationPreference: '',
          },
        });

        adsIndex += 1;
      }
    }

    return feedPosts;
  },
);
