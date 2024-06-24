import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { AuthState } from '../../../state/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { getUser } from '../../../state/selectors/auth.selector';

@Component({
  selector: 'sf-header',
  template: `<div class="sf-header">
    <div class="sf-header__section">
      <img src="assets/images/social-face-logo-no-text.png" alt="logo-image" />
      <button (click)="menuButtonClick.emit()">
        <i-feather name="menu"></i-feather>
      </button>
    </div>
    <div class="sf-header__section">
      <div class="sf-input sf-input__icon">
        <i-feather name="search"></i-feather>
        <input type="text" placeholder="Search on Social Face" />
      </div>
    </div>
    <div class="sf-header__section">
      <button
        (click)="friendsButtonClick.emit()"
        class="sf-header__section__chat-button"
      >
        <i-feather name="message-circle"></i-feather>
      </button>
      <div class="sf-header__section__profile">
        <button>
          <img [src]="user?.profilePicture" alt="" />
        </button>
        <div class="sf-header__section__profile__options"></div>
      </div>
    </div>
  </div>`,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  user: IUser | null = null;

  userSubscription: Subscription;

  @Output() menuButtonClick = new EventEmitter<void>();
  @Output() friendsButtonClick = new EventEmitter<void>();

  constructor(private authStore: Store<AuthState>) {
    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
