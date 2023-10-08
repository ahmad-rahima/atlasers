import { createActionGroup, props } from "@ngrx/store";
import {
  PostAddRequest,
  PostIdAddCommentRequest,
  PostIdAddCommentResponse,
  PostIdDeleteResponse,
  PostIdLoveResponse,
  PostIdUpdateRequest,
  PostsGetResponse,
  PostsIdGetResponse
} from "src/app/dto";


export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Add Comment': props<{ id: string, comment: PostIdAddCommentRequest }>(),
    'Comment Added Success': props<PostIdAddCommentResponse>(),

    'Add Post': props<PostAddRequest | { fd: FormData }>(),
    'Update Post': props<{ id: string, post: PostIdUpdateRequest }>(),
    'Get Post': props<{ id: string }>(),
    'Delete Post': props<{ id: string }>(),
    'Love Post': props<{ id: string }>(),

    'Get Posts': props<{ page: number }>(),
    'Get Posts Success': props<PostsGetResponse>(),

    'Post Loved Success': props<PostIdLoveResponse>(),

    'Post Fetched Success': props<PostsIdGetResponse>(),
    'Post Deleted Success': props<{ id: string }>(),

    'Failure': props<{ error: string }>(),
  },
});
