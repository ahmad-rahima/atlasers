import { createActionGroup, props } from "@ngrx/store";
import {
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
    'Add Profile': props<ProfilesAddRequest | { fd: FormData }>(),
    'Update Profile': props<{ id: string, profile: ProfilesIdUpdateRequest | { fd: FormData } }>(),
    'Delete Profile': props<{ id: string }>(),

    'Toggle Edit Post': props<{ id: string }>(),
    'Cancel Edit Post': props<{ id: string }>(),

    'Get Profile Posts': props<{ id: string, page: number }>(),
    'Get Profile Posts Success': props<ProfilesIdGetPostsResponse>(),

    'Failure': props<{ error: string }>(),
  }
})
