import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsActions } from "../actions/posts.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { PostsService } from "src/app/posts/posts.service";


@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  getPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getPost),
    switchMap(({ id }) => this.postsService.getPost(id)),
    map(data => PostsActions.postFetchedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.addComment),
    tap(data => console.log('Comment: ', data)),
    switchMap(({ id, comment }) => this.postsService.addComment(id, comment)),
    tap(data => console.log('Comment: ', data)),
    map(data => PostsActions.commentAddedSuccess(data)),
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
    map(data => PostsActions.postDeletedSuccess(data)),
    catchError((error) => of(PostsActions.failure(error))),
  ));
}
