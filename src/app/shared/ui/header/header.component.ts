import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AuthState } from '../../../state/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { getUser } from '../../../state/selectors/auth.selector';

@Component({
  selector: 'sf-header',
  template: `<header class="sf-header" tabindex="0">
    <div class="sf-header__section">
      <a routerLink="/feed">
        <img
          src="assets/images/social-face-logo-no-text.png"
          alt="Social Face Logo"
          i18n-alt="@@logoImage"
        />
      </a>
      <button
        (click)="menuButtonClick.emit()"
        aria-label="Open Menu Button"
        i18n-aria-label="@@openMenuButton"
      >
        <i-feather name="menu"></i-feather>
      </button>
    </div>
    <div class="sf-header__section">
      <div class="sf-input sf-input__icon">
        <i-feather name="search"></i-feather>
        <input
          type="text"
          placeholder="Search on Social Face"
          i18n-placeholder="@@searchHeaderInput"
        />
      </div>
    </div>
    <div class="sf-header__section">
      <button
        (click)="friendsButtonClick.emit()"
        class="sf-header__section__chat-button"
        aria-label="Open Friends List Button"
        i18n-aria-label="@@openFriendsButton"
      >
        <i-feather name="message-circle"></i-feather>
      </button>
      <div class="sf-header__section__profile">
        <button
          (click)="toggleDisplayProfileOptions()"
          aria-label="Open User Options"
          i18n-aria-label="@@openUSerOptionsButton"
        >
          <img
            tabindex="0"
            [src]="user?.profilePicture"
            alt="User Profile Picture"
            i18n-alt="@@profilePicture"
          />
        </button>
        <div
          class="sf-header__section__profile__options"
          *ngIf="displayProfileOptions"
        >
          <ul aria-haspopup="menu" tabindex="0">
            <li>
              <a routerLink="/profile">
                <img
                  [src]="user?.profilePicture"
                  alt="User Profile Picture"
                  tabindex="0"
                  i18n-alt="@@profilePicture"
                />
                <span>{{ user?.firstName }} {{ user?.lastName }}</span>
              </a>
            </li>
            <li>
              <a routerLink="/settings">
                <div><i-feather name="settings"></i-feather></div>
                <span i18n="@@settings">Settings</span>
              </a>
            </li>
            <li>
              <a routerLink="/logout">
                <div><i-feather name="log-out"></i-feather></div>
                <span i18n="@@logout">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>`,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnDestroy {
  user: IUser | null = null;
  userSubscription: Subscription;
  displayProfileOptions = false;

  @Output() menuButtonClick = new EventEmitter<void>();
  @Output() friendsButtonClick = new EventEmitter<void>();

  constructor(private authStore: Store<AuthState>) {
    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user = user;
      });
  }

  toggleDisplayProfileOptions() {
    this.displayProfileOptions = !this.displayProfileOptions;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
