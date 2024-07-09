import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedService } from './feed.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const user = { id: '123', firstName: 'Test' };
const email = 'test@mail.com';

describe('FeedComponent', () => {
  let service: FeedService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FeedService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(FeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should get posts', () => {
    const ads = [{ id: '1' }];
    service.getAds().subscribe((ads) => expect(ads.length).toBe(1));

    const req = httpMock.expectOne('/api/ads');
    req.flush(ads);

    expect(req.request.method).toBe('GET');
  });

  it('Should get posts', () => {
    const postsResponse = {
      posts: [{ id: '122' }],
      totalPages: 1,
    };
    service.getPosts(1).subscribe((posts) => expect(posts.posts).toBeTruthy());

    const req = httpMock.expectOne('/api/posts?pageNumber=1');
    req.flush(postsResponse);

    expect(req.request.method).toBe('GET');
  });

  it('Should post comment', () => {
    const post = { id: '122' };
    service
      .postComment(post as any)
      .subscribe((resp) => expect(resp).toBe('done'));

    const req = httpMock.expectOne('/api/post/comment');
    req.flush('done');

    expect(req.request.method).toBe('POST');
  });

  it('Should like post', () => {
    const post = { id: '122' };
    service
      .postLike(post as any)
      .subscribe((resp) => expect(resp).toBe('done'));

    const req = httpMock.expectOne('/api/post/like');
    req.flush('done');

    expect(req.request.method).toBe('POST');
  });
});
