import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthState } from '../../../state/reducers/auth.reducer';
import { getUser } from '../../../state/selectors/auth.selector';
import { IUser } from '../../models/user.model';

/**
 * UI header smart component, displayins user information and has ouputs when clicking a few buttons.
 *
 * * @author Ricardo Legorreta Mendoza
 */
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
        id="openMenuButton"
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
        id="openFriendsButton"
      >
        <i-feather name="message-circle"></i-feather>
      </button>
      <div class="sf-header__section__profile">
        <button
          (click)="toggleDisplayProfileOptions()"
          aria-label="Open User Options"
          i18n-aria-label="@@openUSerOptionsButton"
          id="openUserOptionsButton"
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

  /** Emits when user clicks on the menu button, used to show/hide the menu sidebar in a page. */
  @Output() menuButtonClick = new EventEmitter<void>();
  /** Emits when user clicks on the open friends button, used to show/hide the friends sidebar in a page. */
  @Output() friendsButtonClick = new EventEmitter<void>();

  /**
   * Subscribes to the auth store to get the user data.
   * @param authStore - Injects auth store
   */
  constructor(private authStore: Store<AuthState>) {
    this.userSubscription = this.authStore
      .pipe(select(getUser))
      .subscribe((user) => {
        this.user = user;
      });
  }

  /**
   * Used to display/hide the user profile options floating element.
   */
  toggleDisplayProfileOptions() {
    this.displayProfileOptions = !this.displayProfileOptions;
  }

  /**
   * Unsubscribes a variable.
   */
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
