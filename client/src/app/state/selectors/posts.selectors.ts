import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "../posts.state";

export const selectPosts = createFeatureSelector<PostsState>('posts');

export const selectPostsPosts = createSelector(
  selectPosts,
  (posts: PostsState) => Object.values(posts.entities));
