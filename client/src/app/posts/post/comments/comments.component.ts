import { Component, Input, inject } from '@angular/core';
import { Comment } from 'src/app/dto';
import { PostsService } from '../../posts.service';
import { Store } from '@ngrx/store';
import { PostsActions } from 'src/app/state/actions/posts.actions';
import { PostsActionsDispatcherService } from '../../posts-actions-dispatcher.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  private store = inject(Store);
  private actionsDispatcher = inject(PostsActionsDispatcherService);
  @Input() postId: string | undefined;
  @Input() comments!: Comment[];
  commentHolder = '';

  onComment(): void {
    console.log('Adding comment');

    if (this.postId)
      this.actionsDispatcher.addComment({
        id: this.postId,
        comment: { content: this.commentHolder },
      });
    else
      console.log('Post id is falsy!');
  }
}
