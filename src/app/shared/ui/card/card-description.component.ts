import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

/**
 * UI presentation component used along with <sf-card> component for displaying text only at the bottom position,
 * currently used for displaying a post date or 'Sponsored' text for an advertising.
 *
 * * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-card-description',
  template: `<p tabindex="0"><ng-content></ng-content></p>`,
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardDescriptionComponent {}
