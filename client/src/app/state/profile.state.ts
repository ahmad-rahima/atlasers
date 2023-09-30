import { Post, Profile } from "../dto";

export interface ProfileState {
    profile: Profile;
    posts: Post[];

    loading: boolean;
    error: string;
}
