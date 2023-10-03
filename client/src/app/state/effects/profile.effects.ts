import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileActions } from "../actions/profile.actions";
import { ObservableInput, catchError, map, of, switchMap, tap } from "rxjs";
import { ProfilesService } from "src/app/profiles/profiles.service";
import { PostsService } from "src/app/posts/posts.service";
import { PostsActions } from "../actions/posts.actions";


@Injectable()
export class ProfileEffects {
  private router = inject(Router);
  private profilesService = inject(ProfilesService);
  private postsService = inject(PostsService);
  private actions$ = inject(Actions);

  profilesIdGet = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.getProfile),
    switchMap(({ id }) => this.profilesService.getProfileById(id)),
    map(profile => ProfileActions.profileFetchedSuccess(profile)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesIdGetPosts = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.getProfilePosts),
    switchMap(({ id }) => this.profilesService.getProfilePostsById(id)),
    tap(posts => console.log(posts)),
    map(posts => ProfileActions.getProfilePostsSuccess(posts)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesAdd = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.addProfile),
    switchMap(data => this.profilesService.addProfile(data)),
    map(profile => ProfileActions.profileFetchedSuccess(profile)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesIdUpdate = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.updateProfile),
    switchMap(data => this.profilesService.updateProfileById(data.id, data.profile)),
    map(profile => ProfileActions.profileFetchedSuccess(profile)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  profilesIdDelete = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.deleteProfile),
    tap(({ id }) => this.profilesService.deleteProfileById(id)),
    map(data => ProfileActions.profileDeletedSuccess(data)),
    catchError(error => of(ProfileActions.failure({ error }))),
  ));

  getPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getPost),
    switchMap(({ id }) => this.postsService.getPost(id)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError((error) => of(ProfileActions.failure(error))),
  ));

  addPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.addPost),
    tap(post => console.log('Post: ', post)),
    switchMap((post: any) => this.postsService.addPost((post.fd) || post)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError(error => of(ProfileActions.failure(error))),
  ));

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.addComment),
    tap(data => console.log('Comment: ', data)),
    switchMap(({ id, comment }) => this.postsService.addComment(id, comment)),
    tap(data => console.log('Comment: ', data)),
    map(data => PostsActions.commentAddedSuccess(data)),
    catchError((error) => of(ProfileActions.failure(error))),
  ));

  lovePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.lovePost),
    tap(data => console.log("Lovin post, data: ", data)),
    switchMap(({ id }) => this.postsService.lovePost(id)),
    tap(data => console.log("Data after love: ", data)),
    map((data: any) => PostsActions.postLovedSuccess(data)),
    catchError((error) => of(ProfileActions.failure(error))),
  ));

  updatePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.updatePost),
    switchMap(({ id, post }) => this.postsService.updatePost(id, post)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError((error) => of(ProfileActions.failure(error))),
  ));

  deletePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.deletePost),
    switchMap(({ id }) => this.postsService.deletePost(id)),
    tap(data => console.log("Post to filter out: ", data)),
    map(data => PostsActions.postDeletedSuccess(data)),
    catchError((error) => of(ProfileActions.failure(error))),
  ));

}
