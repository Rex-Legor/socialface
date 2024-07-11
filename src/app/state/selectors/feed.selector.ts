import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from '../reducers/feed.reducer';
import { IPost } from '../../shared/models/feed.model';

export const feedSelectorKey = 'feed';

/** Creates a selector for the whole feed state */
export const getFeedState = createFeatureSelector<FeedState>(feedSelectorKey);

/** Creates a selector for the feed state.loading */
export const getFeedLoading = createSelector(
  getFeedState,
  (state: FeedState) => state.loading,
);

/** Creates a selector for the feed state.errorFetching */
export const getFeedErrorFetching = createSelector(
  getFeedState,
  (state: FeedState) => state.errorFetching,
);

/** Creates a selector for the feed state.posts */
export const getFeedPosts = createSelector(
  getFeedState,
  (state: FeedState) => state.posts,
);

/** Creates a selector for the feed state.totalPostPages */
export const getFeedTotalPages = createSelector(
  getFeedState,
  (state: FeedState) => state.totalPostPages,
);

/** Creates a selector for the feed state.ads */
export const getFeedAds = createSelector(
  getFeedState,
  (state: FeedState) => state.ads,
);

/** Creates a selector for concatenating the feed state.posts and state.ads,
 * the state.ads are all mapped in the format of a post.
 */
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
