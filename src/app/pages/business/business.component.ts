import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * This is a simple component which content doesn't really matter, it is used for validating user permissions as required.
 */
@Component({
  selector: 'sf-business',
  standalone: true,
  template: `<div class="sf-business">
    <img
      src="https://unblast.com/wp-content/uploads/2021/07/Business-Team-Building-Illustration.jpg"
      alt=""
    />
  </div>`,
  styleUrl: './business.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessComponent {}
