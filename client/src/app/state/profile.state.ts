import { Post, Profile } from "../dto";
import { PostsState } from "./posts.state";

export interface ProfileState {
    profile: Profile;
    posts: PostsState;
    editPost: Post | null;

    loading: boolean;
    error: string;
}
