import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { UIModule } from '../../shared/ui/ui.module';
import { IUser } from '../../shared/models/user.model';
import { Store, select } from '@ngrx/store';
import { getUser } from '../../state/selectors/auth.selector';
import { AuthState } from '../../state/reducers/auth.reducer';

import { exportCsv } from './settings.helper';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { updateUser } from '../../state/actions/auth.actions';

/**
 * Page component for displaying user settings.
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  form: FormGroup;
  errorMessage = signal('');
  displaySuccessMessage = signal(false);
  user = signal<IUser | null>(null);

  userSubscription: Subscription;

  /**
   * Initializes a form group, gets the user data and sets the user data in the form.
   * @param fb - Injects FormBuilder
   * @param authStore - Injects auth store
   */
  constructor(
    private fb: FormBuilder,
    private authStore: Store<AuthState>,
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', []],
      profileVisibility: ['', []],
      notificationPreference: ['browser', [Validators.required]],
    });

    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user.set(user);
        this.form.setValue({
          firstName: user?.firstName,
          lastName: user?.lastName,
          notificationPreference: user?.notificationPreference || 'browser',
          phoneNumber: user?.phoneNumber || '',
          profileVisibility: user?.profileVisibility || 'public',
        });
      });
  }

  /**
   * Creates and download a csv file containing all the user data.
   */
  exportSettings() {
    exportCsv({
      'First Name': this.form.get('firstName')?.value,
      'Last Name': this.form.get('lastName')?.value,
      Email: this.user()?.email,
      Country: this.user()?.country,
      Birthdate: this.user()?.birthDate,
      'Phone Number': this.form.get('phoneNumber')?.value,
      'Notification Preference': this.form.get('notificationPreference')?.value,
      'Profile Visibility': this.form.get('profileVisibility')?.value,
    });
  }

  /**
   * Handles on submit.
   */
  saveSettings() {
    if (this.form.invalid) return;
    const newUser = { ...this.user(), ...this.form.value };
    this.authStore.dispatch(
      updateUser({
        user: newUser,
      }),
    );

    this.displaySuccessMessage.set(true);

    setTimeout(() => {
      this.displaySuccessMessage.set(false);
    }, 2000);
  }
}
