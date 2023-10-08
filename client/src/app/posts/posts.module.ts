import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './post/comments/comments.component';
import { CommentComponent } from './post/comments/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
  ],
  exports: [
    PostsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    NgbModule,
  ]
})
export class PostsModule { }
