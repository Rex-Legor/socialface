import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
