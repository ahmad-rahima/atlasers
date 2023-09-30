import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, take } from "rxjs";
import { selectAuth } from "../state/selectors/auth.selectors";
import { Store } from "@ngrx/store";
import { LoginResponse, LogoutResponse, RefreshTokenResponse, RegisterResponse } from "../dto";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL = 'http://localhost:3000/auth';
  private http = inject(HttpClient);
  private store = inject(Store);
  private auth$ = this.store.select(selectAuth);

  public register(user: any) {
    return this.http.post<RegisterResponse>(`${this.AUTH_URL}/register`, user);
  }

  public login(user: any) {
    return this.http.post<LoginResponse>(`${this.AUTH_URL}/login`, user);
  }

  public logout() {
    return this.http.get<LogoutResponse>(`${this.AUTH_URL}/logout`);
  }

  public refreshToken(token: any) {
    return this.http.post<RefreshTokenResponse>(`${this.AUTH_URL}/token`, token);
  }

  public isAuthorized() {
    return this.auth$.pipe(
      take(1),
      map((data: any) => !!data.accessToken),
    );
  }
}
