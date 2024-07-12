import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAd, IPost, IPostsResponseSuccess } from '../models/feed.model';

/**
 * Service for calling feed api.
 */
@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Makes a GET call to /api/posts.
   * @param pageNumber
   * @param userId
   * @returns
   */
  getPosts(pageNumber: number, userId?: string) {
    const params: { pageNumber: number; userId?: string } = { pageNumber };
    if (userId) params.userId = userId;

    return this.httpClient.get<IPostsResponseSuccess>('/api/posts', {
      params,
    });
  }

  /**
   * Makes a GET call to /api/ads.
   * @returns
   */
  getAds() {
    return this.httpClient.get<IAd[]>('/api/ads');
  }

  /**
   * Makes a POST call to /api/post/comment.
   * @param post
   * @returns
   */
  postComment(post: IPost) {
    return this.httpClient.post<void>('/api/post/comment', post);
  }

  /**
   * Makes a POST call to /api/post/like.
   * @param post
   * @returns
   */
  postLike(post: IPost) {
    return this.httpClient.post<void>('/api/post/like', post);
  }
}
