import { createReducer, on } from "@ngrx/store";
import { ProfileState } from "../profile.state";
import { Profile, ProfilesAddRequest, ProfilesIdGetResponse } from "src/app/dto";
import { ProfileActions } from "../actions/profile.actions";
import { PostsActions } from "../actions/posts.actions";

export const initialState: ProfileState = {
  profile: null as unknown as Profile,
  posts: [],
  editPost: [],

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

  on(ProfileActions.toggleEditPost, (state, { id }) => ({
    ...state,
    error: '',
    loading: false,
    editPost: state.posts.filter(post => post._id === id),
  })),

  on(PostsActions.getPost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.updatePost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.deletePost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.addPost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.addComment, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.commentAddedSuccess, (state, data: any) => {
    const idx = state.posts.findIndex((post: any) => post._id === data.id);
    const post = {
      ...state.posts[idx],
      comments: [data.comment, ...state.posts[idx].comments]
    };
    const posts = [...state.posts.slice(0, idx), post, ...state.posts.slice(idx+1)];
    return {
      ...state,
      loading: false,
      error: '',
      posts,
    };
  }),
  on(PostsActions.postDeletedSuccess, (state, { id }) => ({
    ...state,
    error: '',
    loading: false,
    posts: state.posts.filter(post => post._id != id),
  })),
  on(PostsActions.postFetchedSuccess, (state, data) =>
    ({
      ...state,
      error: '',
      loading: false,
      editPost: [],
      posts: [data.post, ...state.posts]
    })),
  
  on(PostsActions.lovePost, (state, data) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.postLovedSuccess, (state, data) => {
    const idx = state.posts.findIndex((post: any) => post._id === data.id);
    const post = {
      ...state.posts[idx],
      loves: state.posts[idx].loves,
      loved: !state.posts[idx].loved,
    };
    const posts = [...state.posts.slice(0, idx), post, ...state.posts.slice(idx+1)];
    return {
      ...state,
      loading: false,
      posts,
    }
  }),
);
