import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAd, IPost } from '../models/feed.model';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<IPost[]>('/api/posts');
  }

  getAds() {
    return this.httpClient.get<IAd[]>('/api/ads');
  }
}
