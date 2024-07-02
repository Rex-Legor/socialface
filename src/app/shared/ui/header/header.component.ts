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
        />
      </a>
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
        <button (click)="toggleDisplayProfileOptions()">
          <img [src]="user?.profilePicture" alt="User Profile Picture" />
        </button>
        <div
          class="sf-header__section__profile__options"
          *ngIf="displayProfileOptions"
        >
          <ul>
            <li>
              <a routerLink="/profile">
                <img [src]="user?.profilePicture" alt="User Profile Picture" />
                <span>{{ user?.firstName }} {{ user?.lastName }}</span>
              </a>
            </li>
            <li>
              <a routerLink="/settings">
                <div><i-feather name="settings"></i-feather></div>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="">
                <div><i-feather name="log-out"></i-feather></div>
                <span>Logout</span>
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
