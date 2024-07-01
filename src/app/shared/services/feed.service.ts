import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAd, IPost, IPostsResponseSuccess } from '../models/feed.model';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private httpClient: HttpClient) {}

  getPosts(pageNumber: number) {
    return this.httpClient.get<IPostsResponseSuccess>('/api/posts', {
      params: { pageNumber },
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
