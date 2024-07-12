import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { resetPassword } from '../../state/actions/auth.actions';
import { AuthState } from '../../state/reducers/auth.reducer';
import {
  getLoginErrorType,
  getLoginLoading,
  getResetPasswordSuccess,
} from '../../state/selectors/auth.selector';

/**
 * Page component for restoring password.
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  form: FormGroup;
  errorMessage = signal('');
  loading$: Observable<boolean>;
  resetSuccess$: Observable<boolean>;

  /**
   * This constructor initializes a form group and gets store properties.
   * @param fb - Injects FormBuilder
   * @param store - Injects auth store
   */
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });

    this.loading$ = this.store.pipe(select(getLoginLoading));
    this.store.pipe(select(getLoginErrorType)).subscribe((error) => {
      this.errorMessage.set(error);
    });
    this.resetSuccess$ = this.store.pipe(
      select(getResetPasswordSuccess),
      tap((value) => {
        if (value) {
          this.form.get('email')?.setValue('');
          this.form.get('email')?.markAsUntouched();
        }
      }),
    );
  }

  /**
   * Handles on submit form.
   */
  onSubmit() {
    const emailControl = this.form.get('email');
    emailControl?.markAsTouched();

    if (this.form.valid) {
      this.store.dispatch(resetPassword({ email: emailControl?.value }));
    }
  }
}
