import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { login, signUp } from '../../state/actions/auth.actions';
import { AuthState } from '../../state/reducers/auth.reducer';
import {
  getLoginLoading,
  getLoginErrorType,
  getIsLoggedIn,
} from '../../state/selectors/auth.selector';
import { Observable } from 'rxjs';
import { UIModule } from '../../shared/ui/ui.module';
import { IUser } from '../../shared/models/user.model';
import { AutocompleteDirective } from '../../shared/directives/autocomplete.directive';

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

  onCountrySelect(country: string) {
    this.form.get('country')?.setValue(country);
  }

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
        profilePicture: this.form.get('country')?.value,
      };

      this.store.dispatch(signUp({ user }));
    }
  }
}
