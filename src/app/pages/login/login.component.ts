import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  signal,
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

/**
 * Page component for login.
 * @author Ricardo Legorreta Mendoza
 */
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
  errorMessage = signal('');

  loading$: Observable<boolean>;
  loggedInSubscribe: Subscription;

  /**
   * This constructor initializes a FormGroup and gets some properties from the store.
   * It also redirects logged in user to the feed page.
   * @param fb - Injects FormBuilder
   * @param store - Injects auth store
   * @param router - Injects Router
   */
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
      this.errorMessage.set(error);
    });
    this.loggedInSubscribe = this.store
      .pipe(select(getIsLoggedIn))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/feed']);
        }
      });
  }

  /**
   * Handles on submit form.
   */
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

  /**
   * Used for unsubscribing variables.
   */
  ngOnDestroy() {
    this.loggedInSubscribe.unsubscribe();
  }
}
