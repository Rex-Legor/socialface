import usersData from '../../../../server/data/users-data.json';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { authSelectorKey, getUser } from '../../state/selectors/auth.selector';
import { IUser } from '../models/user.model';
import { AuthState } from '../../state/reducers/auth.reducer';
import {
  getFeedLoading,
  getFeedErrorFetching,
} from '../../state/selectors/feed.selector';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import { LogoutComponent } from '../../pages/logout/logout.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { Observable } from 'rxjs';

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

describe('authGuard', () => {
  let store: MockStore<AuthState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
  });
  it('should be able to activate', async () => {
    const mockRoute = {
      params: { id: 100 },
    } as unknown as ActivatedRouteSnapshot;

    const result = (await TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, {} as RouterStateSnapshot),
    )) as Observable<GuardResult>;

    result.subscribe((canActivate) => expect(canActivate).toBe(true));
  });

  it('Should NOT be able to activate', async () => {
    const mockRoute = {
      params: { id: 100 },
    } as unknown as ActivatedRouteSnapshot;

    store.overrideSelector(getUser, null);
    store.refreshState();

    const result = (await TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, {} as RouterStateSnapshot),
    )) as Observable<GuardResult>;

    result.subscribe((canActivate) => expect(canActivate).toBe(false));
  });
});
