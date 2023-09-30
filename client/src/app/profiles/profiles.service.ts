import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {
  ProfilesAddRequest,
  ProfilesAddResponse,
  ProfilesIdDeleteResponse,
  ProfilesIdGetPostsResponse,
  ProfilesIdGetResponse,
  ProfilesIdUpdateRequest,
  ProfilesIdUpdateResponse
} from "../dto";


@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private PROFILES_URL = 'http://localhost:3000/profiles';
  private http = inject(HttpClient);

  public getProfileById(id: string) {
    return this.http.get<ProfilesIdGetResponse>(`${this.PROFILES_URL}/${id}`);
  }

  public getProfilePostsById(id: string) {
    return this.http.get<ProfilesIdGetPostsResponse>(`${this.PROFILES_URL}/${id}/posts`);
  }

  public addProfile(data: ProfilesAddRequest) {
    return this.http.post<ProfilesAddResponse>(`${this.PROFILES_URL}`, data);
  }

  public updateProfileById(id: string, data: ProfilesIdUpdateRequest) {
    return this.http.put<ProfilesIdUpdateResponse>(`${this.PROFILES_URL}/${id}`, data);
  }

  public deleteProfileById(id: string) {
    return this.http.delete<ProfilesIdDeleteResponse>(`${this.PROFILES_URL}/${id}`);
  }
}
