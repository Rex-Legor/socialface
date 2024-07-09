import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthState } from '../../state/reducers/auth.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authSelectorKey } from '../../state/selectors/auth.selector';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import * as authActions from '../../state/actions/auth.actions';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<AuthState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
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
              user: null,
              loading: false,
            },
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('Form should get initialized', () => {
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('Should submit login', () => {
    const emailValue = 'test@mail.com';
    const passwordValue = '123';

    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(authActions, 'login').mockImplementation();

    const submitBtn = fixture.debugElement.query(
      By.css('div > div:nth-child(2) > form > button.sf-button.primary'),
    );
    const emailInput = fixture.debugElement.query(
      By.css('div > div:nth-child(2) > form > div:nth-child(2) > input'),
    );

    const passwordInput = fixture.debugElement.query(
      By.css('div > div:nth-child(2) > form > div:nth-child(3) > input'),
    );

    component.loading$
      .pipe(take(1))
      .subscribe((loading) => expect(loading).toBe(false));

    expect((submitBtn.nativeElement as HTMLButtonElement).disabled).toBeFalsy();

    emailInput.nativeElement.value = emailValue;
    passwordInput.nativeElement.value = passwordInput;

    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    submitBtn.nativeElement.click();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      authActions.login({ email: emailValue, password: passwordValue }),
    );
  });
});
