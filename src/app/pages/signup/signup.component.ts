import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AutocompleteDirective } from '../../shared/directives/autocomplete.directive';
import { IUser } from '../../shared/models/user.model';
import { UIModule } from '../../shared/ui/ui.module';
import { signUp } from '../../state/actions/auth.actions';
import { AuthState } from '../../state/reducers/auth.reducer';
import {
  getIsLoggedIn,
  getLoginErrorType,
  getLoginLoading,
} from '../../state/selectors/auth.selector';

/**
 * Page component for signup.
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UIModule,
    RouterModule,
    AutocompleteDirective,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent {
  form: FormGroup;
  errorMessage = signal('');
  loading$: Observable<boolean>;

  birthdatePLaceholder = $localize`:@@birthdate:Birthdate`;

  /**
   * Initializes a formm group, gets loading and error state properties and
   * redirects logged in users to the feed page.
   * @param fb - Injects FormBuilder.
   * @param store - Injects auth store.
   * @param router - injects Router.
   */
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', [Validators.required]],
      country: ['', [Validators.required]],
      notificationPreference: ['browser', [Validators.required]],
    });

    this.loading$ = this.store.pipe(select(getLoginLoading));
    this.store.pipe(select(getLoginErrorType)).subscribe((error) => {
      this.errorMessage.set(error);
    });
    this.store.pipe(select(getIsLoggedIn)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/feed']);
      }
    });
  }

  /**
   * Called when selected/entered country value from auto complete input.
   * @param country
   */
  onCountrySelect(country: string) {
    this.form.get('country')?.setValue(country);
  }

  /**
   * Handles form submit.
   */
  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const user: IUser = {
        id: '123',
        email: this.form.get('email')?.value,
        firstName: this.form.get('fistName')?.value,
        lastName: this.form.get('lastName')?.value,
        notificationPreference: this.form.get('notificationPreference')?.value,
        country: this.form.get('country')?.value,
        birthDate: this.form.get('birthDate')?.value,
        profilePicture: '',
      };

      this.store.dispatch(signUp({ user }));
    }
  }
}
