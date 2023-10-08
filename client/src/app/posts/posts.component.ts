import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPosts } from '../state/selectors/posts.selectors';
import { selectProfilePosts } from '../state/selectors/profile.selectors';
import { merge } from 'rxjs';
import { Post } from '../dto';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private store = inject(Store);
  private postsService = inject(PostsService);

  posts$ = this.store.select<Post[]>(this.postsService.getPostsStoreSelector());

  ngOnInit() {
    this.posts$.subscribe(console.log.bind(console));
  }
}
