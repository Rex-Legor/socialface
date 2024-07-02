import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAd, IPost, IPostsResponseSuccess } from '../models/feed.model';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private httpClient: HttpClient) {}

  getPosts(pageNumber: number, userId?: string) {
    const params: { pageNumber: number; userId?: string } = { pageNumber };
    if (userId) params.userId = userId;

    return this.httpClient.get<IPostsResponseSuccess>('/api/posts', {
      params,
    });
  }

  getAds() {
    return this.httpClient.get<IAd[]>('/api/ads');
  }

  postComment(post: IPost) {
    return this.httpClient.post<IAd[]>('/api/post/comment', post);
  }

  postLike(post: IPost) {
    return this.httpClient.post<IAd[]>('/api/post/like', post);
  }
}
