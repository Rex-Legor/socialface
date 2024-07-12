import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IPost } from '../../models/feed.model';

/**
 * UI smart component for displaying a post.
 *
 * * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  /** Post to display. */
  @Input() post: IPost | null = null;
  /** Emits a text comment when user types a comment and clicks on the send comment button. */
  @Output() commentChange = new EventEmitter<string>();
  /** Emits when user clicks on the like button. */
  @Output() likeChange = new EventEmitter<void>();

  commentText = '';

  /**
   * Called when user clicks on the like button,
   * this simply calls emit for the like event emitter.
   */
  onLikeChange() {
    this.likeChange.emit();
  }

  /**
   * Called when user types a comment and clicks on the send comment button,
   * this calls emit for the comment event emitter and clears the comment input.
   */
  onCommentChange() {
    this.commentChange.emit(this.commentText);
    this.commentText = '';
  }
}
