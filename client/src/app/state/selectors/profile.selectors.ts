import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "../profile.state";
import { Post } from "src/app/dto";


export const selectProfile = createFeatureSelector<ProfileState>('profile');

export const selectProfilePosts = createSelector(
  selectProfile,
  (profile: ProfileState) => Object.values(profile.posts.entities));
