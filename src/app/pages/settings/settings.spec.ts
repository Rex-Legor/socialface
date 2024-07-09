import usersData from '../../../../server/data/users-data.json';
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

import { By } from '@angular/platform-browser';
import { AuthState } from '../../state/reducers/auth.reducer';
import { updateUser } from '../../state/actions/auth.actions';
import * as settingsHelper from './settings.helper';

const user: IUser = {
  birthDate: '',
  country: '',
  email: usersData.users[0].email,
  firstName: usersData.users[0].firstName,
  lastName: usersData.users[0].lastName,
  id: '123',
  profilePicture: usersData.users[0].profilePicture,
  notificationPreference: 'email',
  phoneNumber: '4521231122',
};

const feedInitialState: FeedState = {
  posts: [],
  ads: [],
  loading: false,
  errorFetching: false,
  totalPostPages: 1,
};

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore<AuthState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SettingsComponent,
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
            component: SettingsComponent,
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
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();

    store.overrideSelector(getFeedLoading, false);
    store.overrideSelector(getFeedErrorFetching, false);
    store.refreshState();
  });

  it('Form should be initialized in the constructor', () => {
    expect(component.user()).toBeTruthy();

    expect(component.form.get('firstName')?.value).toBe(user.firstName);
    expect(component.form.get('lastName')?.value).toBe(user.lastName);
    expect(component.form.get('notificationPreference')?.value).toBe(
      user.notificationPreference,
    );
    expect(component.form.get('phoneNumber')?.value).toBe(user.phoneNumber);
    expect(component.form.get('profileVisibility')?.value).toBe('public');
  });

  it('Should save settings', () => {
    expect(component.displaySuccessMessage()).toBe(false);

    jest.spyOn(store, 'dispatch');
    jest.spyOn(component, 'saveSettings');

    const saveSettingsButton = fixture.debugElement.query(
      By.css('div.sf-settings__buttons > button.sf-button.primary'),
    );

    saveSettingsButton.nativeElement.click();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      updateUser({
        user: {
          ...user,
          profileVisibility: 'public',
        },
      }),
    );

    expect(component.displaySuccessMessage()).toBe(true);
  });

  it('Should export user info', () => {
    jest.spyOn(component, 'exportSettings');
    jest.spyOn(settingsHelper, 'exportCsv').mockImplementation();

    const exportButton = fixture.debugElement.query(
      By.css('div.sf-settings__buttons > button.sf-button.green'),
    );

    exportButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.exportSettings).toHaveBeenCalled();
    expect(settingsHelper.exportCsv).toHaveBeenCalled();
  });
});
