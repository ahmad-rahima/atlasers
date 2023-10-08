import { Injectable, inject } from "@angular/core";
import {
    PostAddRequest,
  PostAddResponse,
  PostIdAddCommentRequest,
  PostIdAddCommentResponse,
  PostIdDeleteResponse,
  PostIdLoveResponse,
  PostIdUpdateRequest,
  PostIdUpdateResponse,
  PostsGetResponse,
  PostsIdGetResponse
} from "../dto";
import { HttpClient } from '@angular/common/http';
import { selectProfilePosts } from "../state/selectors/profile.selectors";
import { selectPosts, selectPostsPosts } from "../state/selectors/posts.selectors";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private POSTS_URL = 'http://localhost:3000/posts';
  private http = inject(HttpClient);
  private router = inject(Router);
  public postFormHolder: string = '';

  getPostsStoreSelector(): any {
    return this.router.url === '/profiles' ? selectProfilePosts : selectPostsPosts;
  }

  getPosts(page: number) {
    return this.http.get<PostsGetResponse>(`${this.POSTS_URL}/?page=${page}`);
  }

  addComment(id: string, data: PostIdAddCommentRequest) {
    return this.http.post<PostIdAddCommentResponse>(`${this.POSTS_URL}/${id}/comments`, data);
  }

  lovePost(id: string) {
    return this.http.post<PostIdLoveResponse>(`${this.POSTS_URL}/${id}/loves`, {});
  }

  getPost(id: string) {
    return this.http.get<PostsIdGetResponse>(`${this.POSTS_URL}/${id}`);
  }

  addPost(data: PostAddRequest | FormData) {
    return this.http.post<PostAddResponse>(`${this.POSTS_URL}`, data);
  }

  updatePost(id: string, data: PostIdUpdateRequest) {
    return this.http.put<PostIdUpdateResponse>(`${this.POSTS_URL}/${id}`, data);
  }

  deletePost(id: string) {
    return this.http.delete<PostIdDeleteResponse>(`${this.POSTS_URL}/${id}`);
  }
}
