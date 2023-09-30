import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Post } from "../dto";


export const PostsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export interface PostsState extends EntityState<Post> {
  loading: boolean;
  error: string;
}
