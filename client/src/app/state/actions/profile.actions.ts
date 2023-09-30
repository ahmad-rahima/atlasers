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
    'Add Profile': props<ProfilesAddRequest>(),
    'Update Profile': props<{ id: string, profile: ProfilesIdUpdateRequest }>(),
    'Delete Profile': props<{ id: string }>(),

    'Get Profile Posts': props<{ id: string }>(),
    'Get Profile Posts Success': props<ProfilesIdGetPostsResponse>(),

    'Failure': props<{ error: string }>(),
  }
})