import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { PostsActions } from "../state/actions/posts.actions";
import { ProfileActions } from "../state/actions/profile.actions";
import { PostAddRequest, PostIdUpdateRequest } from "../dto";


@Injectable({
  providedIn: 'root',
})
export class PostsActionsDispatcherService {
    private readonly POSTS_ROUTE = '/posts';
    private readonly PROFILES_ROUTE = '/profiles';

    private get actions() {
        return this.router.url.startsWith(this.PROFILES_ROUTE)
            ? (ProfileActions as unknown as typeof PostsActions)
            : PostsActions;
    }

    constructor(
        private router: Router,
        private store: Store,
    ) {}

    deletePost(id: string) {
        this.store.dispatch(this.actions.deletePost({ id }));
    }

    addPost(post: PostAddRequest | { fd: FormData }) {
        console.log('Dispatching: ', post);
        this.store.dispatch(ProfileActions.addPost(post));
    }

    updatePost(id: string, post: PostIdUpdateRequest) {
        this.store.dispatch(this.actions.updatePost({ id, post }));
    }

    getPost(id: string) {
        this.store.dispatch(this.actions.getPost({ id }));
    }

    addComment(data: { id: string, comment: { content: string } }) {
        console.log('Adding comment');
        this.store.dispatch(this.actions.addComment(data));
    }
    
    lovePost(data: any) {
        console.log('Loving Post');
        this.store.dispatch((this.actions as any).lovePost(data));
    }
}
