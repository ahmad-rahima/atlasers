import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPosts } from '../state/selectors/posts.selectors';
import { selectProfilePosts } from '../state/selectors/profile.selectors';
import { merge } from 'rxjs';
import { Post } from '../dto';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  private store = inject(Store);
  posts$ = merge(
    this.store.select<Post[]>(selectPosts as any),
    this.store.select<Post[]>(selectProfilePosts as any)
  );
}
