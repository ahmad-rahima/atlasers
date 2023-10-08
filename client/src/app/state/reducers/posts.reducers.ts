import { createReducer, on } from "@ngrx/store";
import { PostsAdapter } from "../posts.state";
import { PostsActions } from "../actions/posts.actions";


export const initialState = PostsAdapter.getInitialState({
  error: '',
  loading: false,
});

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.getPost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.updatePost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.deletePost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.addPost, (state, _data) =>
    ({ ...state, loading: true })),
  on(PostsActions.lovePost, (state, _data) =>
    ({...state, loading: true })),
  on(PostsActions.addComment, (state, _data) =>
    ({ ...state, loading: true })),

  on(PostsActions.postDeletedSuccess, (state, { id }) =>
    PostsAdapter.removeOne(id, { ...state, error: '', loading: false })),
  on(PostsActions.postFetchedSuccess, (state, data) =>
    PostsAdapter.addOne(data.post, { ...state, error: '', loading: false })),
  on(PostsActions.failure, (state, data) =>
    ({ ...state, error: data.error })),
  on(PostsActions.getPostsSuccess, (state, data) =>
    PostsAdapter.addMany(data.posts, {
      ...state,
      error: '',
      loading: false,
    })),
  on(PostsActions.commentAddedSuccess, (state, data: any) => {
    const post = state.entities[data.id];
    const changes = {
      comments: [data.comment, ...(post ? post.comments : [])],
    };
    return PostsAdapter.updateOne({ id: data.id, changes }, {
        ...state,
        loading: false,
        error: '',
    });
  }),

  on(PostsActions.postLovedSuccess, (state, data) => {
    const post = state.entities[data.id];
    const changes = {
      loves: data.loves,
      loved: !post?.loved,
    };
    return PostsAdapter.updateOne({ id: data.id, changes }, {
      ...state,
      loading: false,
    });
  }),
);
