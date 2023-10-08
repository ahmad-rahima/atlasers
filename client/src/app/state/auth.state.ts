
export interface AuthState {
  userId: string;
  username: string;
  expiresIn: number;

  accessToken: string;        // jwt
  refreshToken: string;

  loading: boolean;
  error: string;
}
