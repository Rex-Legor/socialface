import usersData from '../../../../server/data/users-data.json';
import postsData from '../../../../server/data/posts-data.json';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IUser } from '../../shared/models/user.model';
import { FeedState } from '../../state/reducers/feed.reducer';
import { authSelectorKey } from '../../state/selectors/auth.selector';
import {
  feedSelectorKey,
  getFeedLoading,
  getFeedErrorFetching,
} from '../../state/selectors/feed.selector';
import { LogoutComponent } from '../logout/logout.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from './profile.component';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';
import { IPost, IPostComment } from '../../shared/models/feed.model';
import { postComment, postLike } from '../../state/actions/feed.actions';

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
  ads: [],
  loading: false,
  errorFetching: false,
  totalPostPages: 1,
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore<FeedState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ProfileComponent,
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();

    store.overrideSelector(getFeedLoading, false);
    store.overrideSelector(getFeedErrorFetching, false);
    store.refreshState();
  });

  it('Should show left sidebars when clicking on header button', () => {
    const openMenuBtn = fixture.debugElement.query(
      By.css('.sf-header .sf-header__section:nth-child(1) > button'),
    );

    const leftSidebar = fixture.debugElement.query(
      By.css('.sf-profile > section:nth-child(1)'),
    );

    expect(component.displayMenu()).toBe(false);

    expect(leftSidebar.nativeElement.outerHTML).not.toContain(
      'sf-profile__section__responsive-display',
    );

    openMenuBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.displayMenu()).toBe(true);
    expect(leftSidebar.nativeElement.outerHTML).toContain(
      'sf-profile__section__responsive-display',
    );
  });

  it('Should display post placeholder while loading posts', async () => {
    component.loading$
      .pipe(take(1))
      .subscribe((loading) => expect(loading).toBe(false));

    expect(
      fixture.debugElement.query(By.css('.sf-post.sf-post-placeholder'))
        ?.nativeElement?.innerHTML,
    ).toBeFalsy();

    store.overrideSelector(getFeedLoading, true);
    store.refreshState();
    fixture.detectChanges();

    component.loading$
      .pipe(take(1))
      .subscribe((loading) => expect(loading).toBe(true));

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

  it('Should like and comment on last post', () => {
    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(component, 'likePost');
    jest.spyOn(component, 'commentPost');

    const lastPostFromComponent = component.posts().at(-1) as IPost;
    const lastPost = fixture.debugElement.query(
      By.css('.sf-profile__content__posts > sf-post:last-child'),
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
