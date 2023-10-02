import { createActionGroup, props } from "@ngrx/store";
import {
  PostAddRequest,
  PostIdAddCommentRequest,
  PostIdAddCommentResponse,
  PostIdDeleteResponse,
  PostIdUpdateRequest,
  PostsIdGetResponse
} from "src/app/dto";


export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Add Post': props<PostAddRequest | FormData>(),
    'Update Post': props<{ id: string, post: PostIdUpdateRequest }>(),
    'Delete Post': props<{ id: string }>(),
    'Get Post': props<{ id: string }>(),

    'Add Comment': props<{ id: string, comment: PostIdAddCommentRequest }>(),
    'Comment Added Success': props<PostIdAddCommentResponse>(),

    'Post Fetched Success': props<PostsIdGetResponse>(),
    'Post Deleted Success': props<{ id: string }>(),

    'Failure': props<{ error: string }>(),
  },
});
