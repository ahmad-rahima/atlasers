import { createReducer, on } from "@ngrx/store";
import { ProfileState } from "../profile.state";
import { Profile, ProfilesAddRequest, ProfilesIdGetResponse } from "src/app/dto";
import { ProfileActions } from "../actions/profile.actions";

export const initialState: ProfileState = {
  profile: null as unknown as Profile,
  posts: [],

  loading: false,
  error: '',
}

export const profileReducers = createReducer(
  initialState,
  on(ProfileActions.getProfile, (state, _data) => ({...state, loading: true})),
  on(ProfileActions.addProfile, (state, _data) => ({...state, loading: true})),
  on(ProfileActions.updateProfile, (state, _data) => ({...state, loading: true})),
  on(ProfileActions.deleteProfile, (state, _data) => ({ ...state, loading: true })),

  on(ProfileActions.failure, (state, _data) => ({
    ...state,
    loading: false,
    error: _data.error
  })),

  on(ProfileActions.profileFetchedSuccess, (state, data: ProfilesIdGetResponse) => ({
    ...state,
    error: '',
    loading: false,
    profile: data.profile,
  })),

  on(ProfileActions.profileDeletedSuccess, (state, _data) => ({
    ...state,
    error: '',
    loading: false
  })),

  on(ProfileActions.getProfilePostsSuccess, (state, data) => ({
    ...state,
    error: '',
    loading: false,
    posts: [
      ...state.posts,
      ...data.posts,
    ],
  })),
);
