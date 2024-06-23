import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sf-header',
  template: `<div class="sf-header">
    <div class="sf-header__section">
      <img src="assets/images/social-face-logo-no-text.png" alt="logo-image" />
    </div>
    <div class="sf-header__section">
      <div class="sf-input sf-input__icon">
        <i-feather name="search"></i-feather>
        <input type="text" placeholder="Search on Social Face" />
      </div>
    </div>
    <div class="sf-header__section">
      <div class="sf-header__section__profile">
        <button>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s"
            alt=""
          />
        </button>
        <div class="sf-header__section__profile__options"></div>
      </div>
    </div>
  </div>`,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
