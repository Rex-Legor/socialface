import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sf-header',
  template: `<div class="sf-header">
    <div class="sf-header__section">
      <img src="assets/images/social-face-logo-no-text.png" alt="logo-image" />
    </div>
    <div class="sf-header__section">
      <div class="sf-input sf-input__search">
        <input type="text" placeholder="Search on Social Face" />
      </div>
    </div>
    <div class="sf-header__section"></div>
  </div>`,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
