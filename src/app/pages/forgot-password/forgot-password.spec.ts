import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { take } from 'rxjs';
import { By } from '@angular/platform-browser';
import * as authActions from '../../state/actions/auth.actions';
import { authSelectorKey } from '../../state/selectors/auth.selector';
import usersData from '../../../../server/data/users-data.json';
import { IUser } from '../../shared/models/user.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthState } from '../../state/reducers/auth.reducer';

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

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let store: MockStore<AuthState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordComponent,
        ReactiveFormsModule,
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
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('Form should get initialized', () => {
    expect(component.form.get('email')?.value).toBe('');
  });

  it('Should submit reset password', () => {
    const emailValue = 'test@mail.com';

    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(authActions, 'resetPassword').mockImplementation();

    const submitBtn = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > button'),
    );
    const emailInput = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > div.sf-input > input'),
    );

    component.loading$
      .pipe(take(1))
      .subscribe((loading) => expect(loading).toBe(false));

    expect((submitBtn.nativeElement as HTMLButtonElement).disabled).toBeFalsy();

    emailInput.nativeElement.value = emailValue;
    emailInput.nativeElement.dispatchEvent(new Event('input'));

    submitBtn.nativeElement.click();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      authActions.resetPassword({ email: emailValue }),
    );
  });
});
