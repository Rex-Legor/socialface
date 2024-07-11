import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

/**
 * UI presentation component used along with <sf-card> for displaying text at the top position,
 * currently used for displaying a user full name in a post.
 *
 * * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-card-title',
  template: `<h3 tabindex="0"><ng-content></ng-content></h3>`,
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardTitleComponent {}
