import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sf-post-refresh',
  template: `
    <div class="sf-post sf-post-refresh">
      <img src="assets/images/error-post.png" alt="Error Image" />
      <h3 tabindex="0">Uups, something happened.</h3>
      <p tabindex="0">
        This may be because of an error that we're working on to get fixed. Try
        to reload this page.
      </p>
      <button
        class="sf-button primary"
        (click)="onRefresh.emit()"
        aria-label="Reload"
      >
        <i-feather name="refresh-cw"></i-feather>Reload
      </button>
    </div>
  `,
  styleUrls: ['./post.component.scss', './post.placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PostRefreshComponent {
  @Output() onRefresh = new EventEmitter<void>();
}
