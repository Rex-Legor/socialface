import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from '../reducers/feed.reducer';
import { IFeedPost } from '../../shared/models/feed.model';

export const feedSelectorKey = 'feed';

export const getFeedState = createFeatureSelector<FeedState>(feedSelectorKey);

export const getFeedLoading = createSelector(
  getFeedState,
  (state: FeedState) => state.loading,
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
    const feedPosts: IFeedPost[] = [];

    let adsIndex = 0;

    console.log('skajbkjkjbsdabjdsabjsad ', state);

    for (let index = 0; index < posts.length; index++) {
      const post = posts[index];

      feedPosts.push({
        id: post.id,
        cardPicture: post.userData.profilePicture,
        cardSubtitle: post.date,
        cardTitle: `${post.userData.firstName} ${post.userData.lastName}`,
        date: '',
        description: post.description,
        picture: post.picture,
        totalComments: post.totalComments,
        totalLikes: post.totalLikes,
      });

      if ((index + 1) % 4 == 0 && adsIndex < ads.length) {
        const ad = ads[adsIndex];

        feedPosts.push({
          id: ad.id,
          cardPicture: ad.companyPicture,
          cardSubtitle: ad.date,
          cardTitle: ad.companyName,
          date: '',
          description: ad.description,
          picture: ad.picture,
          totalComments: ad.totalComments,
          totalLikes: ad.totalLikes,
        });

        adsIndex += 1;
      }
    }

    return feedPosts;
  },
);
