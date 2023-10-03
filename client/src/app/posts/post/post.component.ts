import { Component, Input, OnInit, inject } from '@angular/core';
import { Post } from 'src/app/dto';
import { PostsService } from '../posts.service';
import { PostsActions } from 'src/app/state/actions/posts.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.post.loved);
    this.loveBtnSelected = this.post.loved || false;
  }

  private readonly postsService = inject(PostsService);
  private readonly store = inject(Store);
  loveBtnSelected = false;
  @Input() post!: Post;

  onDelete() {
    if (this.post._id)
      this.store.dispatch(PostsActions.deletePost({ id: this.post._id }));
    else
      console.log('Post id not set');
  }

  onLovePost() {
    if (this.post._id)
      this.store.dispatch(PostsActions.lovePost({ id: this.post._id }));
  }

  onEdit() {
    this.postsService.postFormHolder = this.post._id || '';
  }

  onComment() {
    this.loveBtnSelected = !this.loveBtnSelected;
  }
}
