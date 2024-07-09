import postsData from '../../../../server/data/posts-data.json';
import adsData from '../../../../server/data/ads-data.json';
import usersData from '../../../../server/data/users-data.json';

import * as feedActions from '../actions/feed.actions';
import { feedReducer, initialState } from './feed.reducer';
import { IPost } from '../../shared/models/feed.model';

const posts = postsData.posts.map((post) => ({
  ...post,
  id: `${post.id}`,
  userData: {
    ...post.userData,
    id: `${post.userData.id}`,
  },
}));

const ads = adsData.ads.slice(0, 5).map((ad) => ({
  ...ad,
  id: `${ad.id}`,
}));

describe('feed reducer', () => {
  it('Should change loading to true when getting posts', () => {
    const state = feedReducer(
      initialState,
      feedActions.getPosts({ pageNumber: 1 }),
    );
    expect(state.loading).toBe(true);
  });

  it('Should handle get posts success', () => {
    expect(initialState.posts.length).toBe(0);
    const state = feedReducer(
      initialState,
      feedActions.getPostsSuccess({ posts: posts.slice(0, 4), totalPages: 5 }),
    );

    const secondCallState = feedReducer(
      state,
      feedActions.getPostsSuccess({ posts: posts.slice(5, 9), totalPages: 5 }),
    );

    const thirdCallState = feedReducer(
      secondCallState,
      feedActions.getPostsSuccess({
        posts: posts.slice(0, 4),
        totalPages: 5,
        resetPosts: true,
      }),
    );

    expect(state.posts.length).toBe(4);
    expect(state.totalPostPages).toBe(5);
    expect(secondCallState.posts.length).toBe(8);
    expect(thirdCallState.posts.length).toBe(4);
  });

  it('Should handle error fetching posts', () => {
    expect(initialState.errorFetching).toBe(false);

    const state = feedReducer(initialState, feedActions.getPostsError());

    expect(state.errorFetching).toBe(true);
  });

  it('Should change loading to true when getting ads', () => {
    const state = feedReducer(initialState, feedActions.getAds());
    expect(state.loading).toBe(true);
  });

  it('Should handle get ads success', () => {
    expect(initialState.ads.length).toBe(0);
    const state = feedReducer(initialState, feedActions.getAdsSuccess({ ads }));
    expect(state.ads).toBe(ads);
  });

  it('Calling like post and comment post should NOT update the state', () => {
    expect(
      feedReducer(initialState, feedActions.postLike({ post: posts[0] })),
    ).toStrictEqual(initialState);

    expect(
      feedReducer(initialState, feedActions.postComment({ post: posts[0] })),
    ).toStrictEqual(initialState);
  });

  it('Should handle like post success', () => {
    const postToLike = {
      ...posts[0],
      liked: true,
    };

    const state = feedReducer(
      initialState,
      feedActions.getPostsSuccess({ posts: posts.slice(0, 4), totalPages: 1 }),
    );

    expect(state.posts[0]).toStrictEqual(posts[0]);

    const likePostState = feedReducer(
      state,
      feedActions.postLikeSuccess({ post: postToLike }),
    );

    expect(state.posts.length).toBe(4);
    expect(likePostState.posts.length).toBe(4);
    expect(likePostState.posts[0]).not.toStrictEqual(posts[0]);
    expect(likePostState.posts[0]).toStrictEqual(postToLike);
  });

  it('Should handle comment post success', () => {
    const postToComment = {
      ...posts[0],
      comments: [
        {
          comment: 'Test comment',
          postId: posts[0].id,
          userData: {
            birthDate: '',
            country: '',
            email: usersData.users[0].email,
            firstName: usersData.users[0].firstName,
            lastName: usersData.users[0].lastName,
            id: '123',
            profilePicture: usersData.users[0].profilePicture,
            notificationPreference: 'email',
          },
        },
      ],
    } as IPost;

    const state = feedReducer(
      initialState,
      feedActions.getPostsSuccess({ posts: posts.slice(0, 4), totalPages: 1 }),
    );

    expect(state.posts[0]).toStrictEqual(posts[0]);

    const likePostState = feedReducer(
      state,
      feedActions.postCommentSuccess({ post: postToComment }),
    );

    expect(state.posts.length).toBe(4);
    expect(likePostState.posts.length).toBe(4);
    expect(likePostState.posts[0]).not.toStrictEqual(posts[0]);
    expect(likePostState.posts[0]).toStrictEqual(postToComment);
  });

  it('Should update a single post/ad', () => {
    const postToUpdate = {
      ...posts[0],
      liked: true,
    };
    const state = feedReducer(
      initialState,
      feedActions.getPostsSuccess({ posts: posts.slice(0, 4), totalPages: 1 }),
    );
  });
});
