import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

/**
 * UI presentation component used to indicate that a page is getting posts from the api.
 *
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-post-placeholder',
  template: `
    <div class="sf-post sf-post-placeholder">
      <div class="sf-post-placeholder__content">
        <sf-card>
          <img
            src="/assets/images/50x50.svg"
            alt="Card Picture Gray Placeholder"
            sf-card-avatar
          />
          <sf-card-title>placeholder title</sf-card-title>
          <sf-card-description>placeholder sub title</sf-card-description>
        </sf-card>
        <p></p>
        <p></p>
        <div class="sf-post-placeholder__content__footer">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    '../post/post.component.scss',
    './post.placeholder.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PostPlaceholderComponent {}
