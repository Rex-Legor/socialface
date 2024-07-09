import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore<AuthState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('Form should get initialized', () => {
    expect(component.form.get('firstName')?.value).toBe('');
    expect(component.form.get('lastName')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('birthDate')?.value).toBe('');
    expect(component.form.get('country')?.value).toBe('');
    expect(component.form.get('notificationPreference')?.value).toBe('browser');
  });

  it('Should display error when form is invalid and submit should NOT proceed', () => {
    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(component, 'onSubmit');

    const submitBtn = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > button.sf-button.primary'),
    );

    submitBtn.nativeElement.click();
    fixture.detectChanges();

    const spanErrors = fixture.debugElement.queryAll(
      By.css('.sf-input__error'),
    );

    expect(component.onSubmit).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(spanErrors.length).toBe(5); // there should be 5 error displayed
  });

  it('Should submit signup', () => {
    const firstNameValue = 'Test';
    const lastNameValue = 'User';
    const emailValue = 'test@mail.com';
    const birthDateValue = '1993-02-20';
    const countryValue = 'Mexico';

    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(authActions, 'signUp').mockImplementation();

    const submitBtn = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > button.sf-button.primary'),
    );

    const firstNameInput = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > div:nth-child(2) > input'),
    );
    const lastNameInput = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > div:nth-child(3) > input'),
    );
    const emailInput = fixture.debugElement.query(
      By.css('div > div:nth-child(1) > form > div:nth-child(4) > input'),
    );
    const birthDateInput = fixture.debugElement.query(
      By.css(
        'div > div:nth-child(1) > form > div.sf-input.sf-datepicker > input',
      ),
    );
    const countryInput = fixture.debugElement.query(
      By.css(
        'div > div:nth-child(1) > form > div.sf-input.sf-autocomplete > input',
      ),
    );

    firstNameInput.nativeElement.value = firstNameValue;
    lastNameInput.nativeElement.value = lastNameValue;
    emailInput.nativeElement.value = emailValue;
    birthDateInput.nativeElement.value = birthDateValue;
    countryInput.nativeElement.value = countryValue;

    firstNameInput.nativeElement.dispatchEvent(new Event('input'));
    lastNameInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    birthDateInput.nativeElement.dispatchEvent(new Event('input'));
    countryInput.nativeElement.dispatchEvent(new Event('input'));

    submitBtn.nativeElement.click();
    fixture.detectChanges();

    const spanErrors = fixture.debugElement.queryAll(
      By.css('.sf-input__error'),
    );
    const user = {
      id: '123',
      email: emailValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      notificationPreference: 'browser',
      country: countryValue,
      birthDate: birthDateValue,
      profilePicture: '',
    };
    expect(spanErrors.length).toBe(0);
    expect(store.dispatch).toHaveBeenCalledWith(authActions.signUp({ user }));
  });
});
