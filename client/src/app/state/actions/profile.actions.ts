import { createActionGroup, props } from "@ngrx/store";
import {
    PostAddRequest,
  PostIdAddCommentRequest,
  PostIdAddCommentResponse,
  PostIdLoveResponse,
  PostIdUpdateRequest,
  PostsIdGetResponse,
  ProfilesAddRequest,
  ProfilesIdGetPostsResponse,
  ProfilesIdGetResponse,
  ProfilesIdUpdateRequest
} from "src/app/dto";


export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Profile Fetched Success': props<ProfilesIdGetResponse>(),
    'Profile Deleted Success': props<{ id: string }>(),

    'Get Profile': props<{ id: string }>(),
    'Add Profile': props<ProfilesAddRequest>(),
    'Update Profile': props<{ id: string, profile: ProfilesIdUpdateRequest }>(),
    'Delete Profile': props<{ id: string }>(),

    'Toggle Edit Post': props<{ id: string }>(),
    'Cancel Edit Post': props<{ id: string }>(),

    'Add Comment': props<{ id: string, comment: PostIdAddCommentRequest }>(),
    'Comment Added Success': props<PostIdAddCommentResponse>(),

    'Add Post': props<PostAddRequest | { fd: FormData }>(),
    'Update Post': props<{ id: string, post: PostIdUpdateRequest }>(),
    'Get Post': props<{ id: string }>(),
    'Get Profile Posts': props<{ id: string }>(),
    'Delete Post': props<{ id: string }>(),
    'Love Post': props<{ id: string }>(),

    'Post Loved Success': props<PostIdLoveResponse>(),

    'Post Fetched Success': props<PostsIdGetResponse>(),
    'Post Deleted Success': props<{ id: string }>(),

    'Get Profile Posts Success': props<ProfilesIdGetPostsResponse>(),

    'Failure': props<{ error: string }>(),
  }
})
