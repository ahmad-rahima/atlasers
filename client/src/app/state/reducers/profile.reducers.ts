import { createReducer, on } from "@ngrx/store";
import { ProfileState } from "../profile.state";
import { Profile, ProfilesIdGetResponse } from "src/app/dto";
import { ProfileActions } from "../actions/profile.actions";
import { PostsActions } from "../actions/posts.actions";
import { PostsAdapter } from "../posts.state";

export const initialState: ProfileState = {
  profile: null as unknown as Profile,
  posts: PostsAdapter.getInitialState({
    loading: false,
    error: '',
    finished: false,
  }),
  editPost: null,

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
    posts: PostsAdapter.addMany(data.posts, {
      ...state.posts,
      loading: false,
      error: '',
      finished: data.posts.length === 0,
    }),
  })),

  on(ProfileActions.toggleEditPost, (state, { id }) => ({
    ...state,
    error: '',
    loading: false,
    editPost: state.posts.entities[id] || null,
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
    const post = state.posts.entities[data.id];
    const changes = {
      comments: [data.comment, ...(post ? post.comments : [])],
    };
    return {
      ...state,
      loading: false,
      error: '',
      posts: PostsAdapter.updateOne({ id: data.id, changes }, state.posts),
    };
  }),
  on(PostsActions.postDeletedSuccess, (state, { id }) => ({
    ...state,
    error: '',
    loading: false,
    posts: PostsAdapter.removeOne(id, state.posts),
  })),
  on(PostsActions.postFetchedSuccess, (state, data) =>
    ({
      ...state,
      error: '',
      loading: false,
      editPost: null,
      posts: PostsAdapter.addOne(data.post, state.posts),
    })),
  
  on(PostsActions.lovePost, (state, data) => ({
    ...state,
    loading: true,
  })),

  on(PostsActions.postLovedSuccess, (state, data) => {
    const post = state.posts.entities[data.id];
    const changes = {
      loves: data.loves,
      loved: !post?.loved,
    }
    return {
      ...state,
      loading: false,
      posts: PostsAdapter.updateOne({ id: data.id, changes }, state.posts),
    }
  }),
);
