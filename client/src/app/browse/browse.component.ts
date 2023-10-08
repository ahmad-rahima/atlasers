import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Observable, filter, fromEvent, take, map, zip, tap, interval, skip } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProfile } from '../state/selectors/profile.selectors';
import { selectAuth } from '../state/selectors/auth.selectors';
import { ProfileActions } from '../state/actions/profile.actions';
import { PostsActions } from '../state/actions/posts.actions';
import { selectPosts } from '../state/selectors/posts.selectors';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  private postsService = inject(PostsService);
  private store = inject(Store);
  private authStore$ = this.store.select(selectAuth);
  private postsStore$ = this.store.select(selectPosts) as Observable<any>;
  private scrolls$ = fromEvent(window, 'scroll').pipe(
    filter(() => (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)),
  );
  private posts$: any;
  userId: any;

  ngOnInit() {
    this.authStore$.pipe(
      take(1),
      map(data => (data as any).userId),
      tap(userId => this.userId = userId),
      // tap(userId => this.store.dispatch(ProfileActions.getProfile({ id: userId }))),
      // tap(userId => this.store.dispatch(ProfileActions.getProfilePosts({ id: userId, page: 1 }))),
    ).subscribe();

    this.store.dispatch(PostsActions.getPosts({ page: 0 }));

    this.posts$ = zip([
      interval(500).pipe(skip(2)),
      this.postsStore$,
      this.scrolls$,
    ]).pipe(
      filter(([n, posts]) => !posts.finished),
      map(([n]) => n),
      tap(this.getPosts.bind(this)),
    ).subscribe();

  }

  private getPosts() {
    this.store.dispatch(PostsActions.getPosts({ page: 0 }));
  }

  ngOnDestroy() {
    this.posts$.unsubscribe();
  }
}
