import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsActions } from "../actions/posts.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { PostsService } from "src/app/posts/posts.service";
import { PostAddRequest } from "src/app/dto";


@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  getPosts$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getPosts),
    switchMap(({ page }) => this.postsService.getPosts(page)),
    map((data) => PostsActions.getPostsSuccess(data)),
    catchError(error => of(PostsActions.failure({ error }))),
  ));

  getPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getPost),
    switchMap(({ id }) => this.postsService.getPost(id)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));

  addPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.addPost),
    switchMap((post: any) => this.postsService.addPost((post.fd) || post)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError(error => of(PostsActions.failure(error))),
  ));

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.addComment),
    switchMap(({ id, comment }) => this.postsService.addComment(id, comment)),
    tap(data => console.log('Comment: ', data)),
    map(data => PostsActions.commentAddedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));

  lovePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.lovePost),
    tap(data => console.log("Lovin post, data: ", data)),
    switchMap(({ id }) => this.postsService.lovePost(id)),
    tap(data => console.log("Data after love: ", data)),
    map((data: any) => PostsActions.postLovedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));

  updatePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.updatePost),
    switchMap(({ id, post }) => this.postsService.updatePost(id, post)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));

  deletePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.deletePost),
    switchMap(({ id }) => this.postsService.deletePost(id)),
    tap(data => console.log("Post to filter out: ", data)),
    map(data => PostsActions.postDeletedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));
}
