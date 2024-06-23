import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'sf-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() avatar = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
  @Input() picture = '';
  @Input() liked = false;
  @Input() totalLikes = 0;
  @Input() totalComments = 0;
}
