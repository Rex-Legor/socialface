import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IPost } from '../../models/feed.model';

@Component({
  selector: 'sf-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post: IPost | null = null;
  @Output() commentChange = new EventEmitter<string>();
  @Output() likeChange = new EventEmitter<void>();

  commentText = '';

  onLikeChange() {
    this.likeChange.emit();
  }

  onCommentChange() {
    this.commentChange.emit(this.commentText);
    this.commentText = '';
  }
}
