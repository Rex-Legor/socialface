import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sf-feed',
  standalone: true,
  imports: [CommonModule],
  template: `<p>feed works!</p>`,
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
