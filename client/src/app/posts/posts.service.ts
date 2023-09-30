import { Injectable, inject } from "@angular/core";
import {
  PostIdAddCommentRequest,
  PostIdAddCommentResponse,
  PostIdDeleteResponse,
  PostIdUpdateRequest,
  PostIdUpdateResponse,
  PostsIdGetResponse
} from "../dto";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private POSTS_URL = 'http://localhost:3000/posts';
  private http = inject(HttpClient);

  addComment(id: string, data: PostIdAddCommentRequest) {
    return this.http.post<PostIdAddCommentResponse>(`${this.POSTS_URL}/${id}/comments`, data);
  }

  getPost(id: string) {
    return this.http.get<PostsIdGetResponse>(`${this.POSTS_URL}/${id}`);
  }

  updatePost(id: string, data: PostIdUpdateRequest) {
    return this.http.put<PostIdUpdateResponse>(`${this.POSTS_URL}/${id}`, data);
  }

  deletePost(id: string) {
    return this.http.delete<PostIdDeleteResponse>(`${this.POSTS_URL}/${id}`);
  }
}
