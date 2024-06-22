import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { UIModule } from '../../shared/ui/ui.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../state/reducers/auth.reducer';
import { login } from '../../state/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import {
  getIsLoggedIn,
  getLoginErrorType,
  getLoginLoading,
} from '../../state/selectors/auth.selector';
import { Router, RouterModule } from '@angular/router';

type LoginErrorType = 404 | 500;

@Component({
  selector: 'sf-login.page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  errorMessage = '';

  loginErrorType: LoginErrorType | null = null;
  loading$: Observable<boolean>;
  loggedInSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loading$ = this.store.pipe(select(getLoginLoading));
    this.store.pipe(select(getLoginErrorType)).subscribe((error) => {
      this.errorMessage = error;
    });
    this.loggedInSubscribe = this.store
      .pipe(select(getIsLoggedIn))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/feed']);
        }
      });
  }

  onSubmit() {
    const emailControl = this.form.get('email');
    emailControl?.markAsTouched();
    const passwordControl = this.form.get('password');
    passwordControl?.markAsTouched();

    if (this.form.valid) {
      this.store.dispatch(
        login({ email: emailControl?.value, password: passwordControl?.value }),
      );
    }
  }

  ngOnDestroy() {
    this.loggedInSubscribe.unsubscribe();
  }
}
