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
