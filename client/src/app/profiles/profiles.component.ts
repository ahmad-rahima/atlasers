import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../state/actions/profile.actions';
import { selectAuth } from '../state/selectors/auth.selectors';
import { Observable, lastValueFrom, map, take, tap } from 'rxjs';
import { Profile, ProfilesIdGetResponse } from '../dto';
import { selectProfile } from '../state/selectors/profile.selectors';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  private store = inject(Store);
  private authStore$ = this.store.select(selectAuth);

  profilesStore$ = this.store.select(selectProfile) as Observable<any>;

  async ngOnInit() {
    this.authStore$.pipe(
      take(1),
      map(data => (data as any).userId),
      tap(userId => this.store.dispatch(ProfileActions.getProfile({ id: userId }))),
      tap(userId => this.store.dispatch(ProfileActions.getProfilePosts({ id: userId }))),
    ).subscribe();
  }

  /* TODO: add infinite scrolling post fetch. */
}
