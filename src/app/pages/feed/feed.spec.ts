import { FeedComponent } from './feed.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import usersData from '../../../../server/data/users-data.json';
import postsData from '../../../../server/data/posts-data.json';
import adsData from '../../../../server/data/ads-data.json';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authSelectorKey } from '../../state/selectors/auth.selector';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { By } from '@angular/platform-browser';
import {
  feedSelectorKey,
  getFeedLoading,
  getFeedErrorFetching,
  getFeedTotalPages,
} from '../../state/selectors/feed.selector';
import { FeedState } from '../../state/reducers/feed.reducer';
import { take, tap } from 'rxjs';
import {
  FeedActionTypes,
  postComment,
  postLike,
} from '../../state/actions/feed.actions';
import { IPost, IPostComment } from '../../shared/models/feed.model';
import { IUser } from '../../shared/models/user.model';

const user: IUser = {
  birthDate: '',
  country: '',
  email: usersData.users[0].email,
  firstName: usersData.users[0].firstName,
  lastName: usersData.users[0].lastName,
  id: '123',
  profilePicture: usersData.users[0].profilePicture,
  notificationPreference: 'email',
};

const feedInitialState: FeedState = {
  posts: postsData.posts.slice(0, 4).map((post) => ({
    ...post,
    id: `${post.id}`,
    userData: {
      ...post.userData,
      id: `${post.userData.id}`,
    },
  })),
  ads: adsData.ads.slice(0, 1).map((ad) => ({
    ...ad,
    id: `${ad.id}`,
  })),
  loading: false,
  errorFetching: false,
  totalPostPages: 1,
};

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let store: MockStore<FeedState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FeedComponent,
        RouterModule.forRoot([
          {
            path: 'settings',
            component: SettingsComponent,
          },
          {
            path: 'logout',
            component: LogoutComponent,
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
        ]),
      ],
      providers: [
        provideMockStore({
          initialState: {
            [authSelectorKey]: {
              user,
              loading: false,
            },
            [feedSelectorKey]: feedInitialState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();

    store.overrideSelector(getFeedLoading, false);
    store.overrideSelector(getFeedErrorFetching, false);
    store.refreshState();
  });

  it('Should show left and right sidebars when clicking on header buttons', () => {
    const openMenuBtn = fixture.debugElement.query(
      By.css('.sf-header .sf-header__section:nth-child(1) > button'),
    );

    const openFriendsListBtn = fixture.debugElement.query(
      By.css('.sf-header .sf-header__section:nth-child(3) > button'),
    );

    const leftSidebar = fixture.debugElement.query(
      By.css('.sf-feed > section:nth-child(1)'),
    );

    const rightSidebar = fixture.debugElement.query(
      By.css('.sf-feed > section:nth-child(3)'),
    );

    expect(component.displayMenu()).toBe(false);
    expect(component.displayFriends()).toBe(false);

    expect(leftSidebar.nativeElement.outerHTML).not.toContain(
      'sf-feed__section__responsive-display',
    );

    openMenuBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.displayMenu()).toBe(true);
    expect(leftSidebar.nativeElement.outerHTML).toContain(
      'sf-feed__section__responsive-display',
    );

    expect(rightSidebar.nativeElement.outerHTML).not.toContain(
      'sf-feed__section__responsive-display',
    );

    openFriendsListBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.displayFriends()).toBe(true);
    expect(rightSidebar.nativeElement.outerHTML).toContain(
      'sf-feed__section__responsive-display',
    );
  });

  it('Should display 5 posts and user should be valid', () => {
    const postsDiv = fixture.debugElement.query(
      By.css('.sf-feed__content__posts'),
    );

    expect(component.user()).toEqual(user);
    expect(component.feedPosts().length).toBe(5);
    expect((postsDiv.nativeElement as HTMLDivElement).children.length).toBe(5);
  });

  it('Should display post placeholder while loading posts', async () => {
    expect(component.loading()).toBe(false);
    expect(
      fixture.debugElement.query(By.css('.sf-post.sf-post-placeholder'))
        ?.nativeElement?.innerHTML,
    ).toBeFalsy();

    store.overrideSelector(getFeedLoading, true);
    store.refreshState();
    fixture.detectChanges();

    expect(component.loading()).toBe(true);
    expect(
      fixture.debugElement.query(By.css('.sf-post.sf-post-placeholder'))
        ?.nativeElement?.innerHTML,
    ).toBeTruthy();
  });

  it('Should display error component', async () => {
    component.errorFetching$
      .pipe(take(1))
      .subscribe((error) => expect(error).toBe(false));
    expect(
      fixture.debugElement.query(By.css('.sf-post.sf-post-refresh'))
        ?.nativeElement?.innerHTML,
    ).toBeFalsy();

    store.overrideSelector(getFeedErrorFetching, true);
    store.refreshState();
    fixture.detectChanges();

    component.errorFetching$
      .pipe(take(1))
      .subscribe((error) => expect(error).toBe(true));
    expect(
      fixture.debugElement.query(By.css('.sf-post.sf-post-refresh'))
        ?.nativeElement?.innerHTML,
    ).toBeTruthy();
  });

  it('Should call for more posts after scrolling to the bottom', () => {
    store.overrideSelector(getFeedTotalPages, 2);
    store.refreshState();

    jest.spyOn(component, 'getPosts');
    jest.spyOn(store, 'dispatch').mockImplementation();

    expect(component.totalPages()).toBe(2);
    expect(component.getPosts).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();

    document.documentElement.scrollTop = 10;

    jest
      .spyOn(document.documentElement, 'scrollHeight', 'get')
      .mockImplementation(() => 600);
    component.onWindowScroll();

    document.documentElement.scrollTop = 500;
    component.onWindowScroll();

    expect(component.getPosts).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('Should like and comment on last post', () => {
    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(component, 'likePost');
    jest.spyOn(component, 'commentPost');

    const lastPostFromComponent = component.feedPosts().at(-1) as IPost;
    const lastPost = fixture.debugElement.query(
      By.css('.sf-feed__content__posts > sf-post:last-child'),
    );
    const commentValue =
      'This is a comment made for testing post comment feature on feed';

    expect(store.dispatch).not.toHaveBeenCalled();

    const likeBtn = lastPost.nativeElement.querySelector(
      '.sf-post__footer__actions > button:nth-child(1)',
    ) as HTMLButtonElement;
    const commentInput = lastPost.nativeElement.querySelector(
      '.sf-post__footer__comment > input',
    ) as HTMLInputElement;
    const commentBtn = lastPost.nativeElement.querySelector(
      '.sf-post__footer__comment > button',
    ) as HTMLButtonElement;

    likeBtn.click();
    fixture.detectChanges();

    expect(component.likePost).toHaveBeenCalled();

    lastPostFromComponent.liked = true;
    expect(store.dispatch).toHaveBeenLastCalledWith(
      postLike({ post: lastPostFromComponent }),
    );

    commentInput.value = commentValue;

    commentInput.dispatchEvent(new Event('input'));

    commentBtn.click();
    fixture.detectChanges();

    expect(component.commentPost).toHaveBeenCalled();

    const newComment: IPostComment = {
      comment: commentValue,
      postId: lastPostFromComponent.id,
      userData: user,
    };

    lastPostFromComponent.comments = [newComment];

    expect(store.dispatch).toHaveBeenCalledWith(
      postComment({
        post: lastPostFromComponent,
      }),
    );
  });
});
