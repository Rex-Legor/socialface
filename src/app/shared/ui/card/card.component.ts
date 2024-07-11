import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * UI presentation Component for displaying a portion of a post,
 * typically including user informaton and post date.
 *
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-card',
  template: `<div class="sf-card">
    <div class="sf-card__section">
      <ng-content select="[sf-card-avatar]"></ng-content>
    </div>
    <div class="sf-card__section">
      <ng-content select="sf-card-title"></ng-content>
      <ng-content select="sf-card-description"></ng-content>
    </div>
  </div>`,
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
