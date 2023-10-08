import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../state/actions/profile.actions';
import { selectAuth } from '../state/selectors/auth.selectors';
import { Observable, filter, first, fromEvent, interval, last, lastValueFrom, map, skip, skipWhile, startWith, switchMap, take, takeWhile, tap, zip } from 'rxjs';
import { selectProfile, } from '../state/selectors/profile.selectors';
import { Router } from '@angular/router';
import { ProfileState } from '../state/profile.state';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private authStore$ = this.store.select(selectAuth);
  // TODO: change this to whether the current profiles is the user's
  isUsers = true;
  userId = '';
  userName = '';
  posts$: any;

  profilesStore$ = this.store.select(selectProfile) as Observable<any>;
  private scrolls$ = fromEvent(window, 'scroll').pipe(
    filter(() => (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)),
  );

  ngOnInit() {
    this.profilesStore$.pipe(
      // wait until starting fetching data
      skipWhile(profile => !profile.loading),
      switchMap(() => this.profilesStore$),
      // wait until data fetched
      skipWhile(profile => profile.loading),
      first(),
      filter((profile: ProfileState) => profile.profile === null && profile.error === 'Profile not found'),
    ).subscribe((data: any) => {
      this.router.navigate(['/profiles/form']);
    });

    this.authStore$.pipe(
      take(1),
      tap(data => console.log('UserName: ', data)),
      tap((data: any) => this.userName = data.username),
      map(data => (data as any).userId),
      tap(userId => this.userId = userId),
      tap(userId => this.store.dispatch(ProfileActions.getProfile({ id: userId }))),
      tap(userId => this.store.dispatch(ProfileActions.getProfilePosts({ id: userId, page: 1 }))),
    ).subscribe();

    this.posts$ = zip([
      interval(500).pipe(skip(2)),
      this.profilesStore$,
      this.scrolls$,
    ]).pipe(
      filter(([n, profile]) => !profile.posts.finished),
      map(([n]) => n),
      tap(this.getPosts.bind(this)),
    ).subscribe();

  }

  private getPosts(page: number) {
    this.store.dispatch(ProfileActions.getProfilePosts({ id: this.userId, page }));
  }

  ngOnDestroy() {
    this.posts$.unsubscribe();
  }
}
