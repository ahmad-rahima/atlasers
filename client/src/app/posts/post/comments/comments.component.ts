import { Component, Input, inject } from '@angular/core';
import { Comment } from 'src/app/dto';
import { Store } from '@ngrx/store';
import { PostsActions } from 'src/app/state/actions/posts.actions';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  private store = inject(Store);
  @Input() postId: string | undefined;
  @Input() comments!: Comment[];
  commentHolder = '';

  onComment(): void {
    console.log('Adding comment');

    if (this.postId)
      this.store.dispatch(PostsActions.addComment({
        id: this.postId,
        comment: { content: this.commentHolder },
      }));
    else
      console.log('Post id is falsy!');
  }
}
