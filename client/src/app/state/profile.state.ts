import { Post, Profile } from "../dto";

export interface ProfileState {
    profile: Profile;
    posts: Post[];
    editPost: Post[];

    loading: boolean;
    error: string;
}
