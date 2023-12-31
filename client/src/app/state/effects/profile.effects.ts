import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileActions } from "../actions/profile.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ProfilesService } from "src/app/profiles/profiles.service";


@Injectable()
export class ProfileEffects {
  private profilesService = inject(ProfilesService);
  private actions$ = inject(Actions);

  profilesIdGet = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.getProfile),
    switchMap(({ id }) => this.profilesService.getProfileById(id)),
    map(profile => {
      if (profile.profile)
        return ProfileActions.profileFetchedSuccess(profile);
      else  // TODO: change this to backend error!
        return ProfileActions.failure({ error: 'Profile not found' });
    }),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesIdGetPosts = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.getProfilePosts),
    switchMap(({ id, page }) => this.profilesService.getProfilePostsById(id, page)),
    tap(posts => console.log(posts)),
    map(posts => ProfileActions.getProfilePostsSuccess(posts)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesAdd = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.addProfile),
    switchMap(data => this.profilesService.addProfile((data as any).fd || data)),
    map(profile => ProfileActions.profileFetchedSuccess(profile)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesIdUpdate = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.updateProfile),
    switchMap(data => this.profilesService.updateProfileById(data.id, (data.profile as any).fd || data.profile)),
    map(profile => ProfileActions.profileFetchedSuccess(profile)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesIdDelete = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.deleteProfile),
    tap(({ id }) => this.profilesService.deleteProfileById(id)),
    map(data => ProfileActions.profileDeletedSuccess(data)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

}
