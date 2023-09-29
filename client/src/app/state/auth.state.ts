
export interface AuthState {
  userId: string;
  expiresIn: number;

  accessToken: string;        // jwt
  refreshToken: string;

  loading: boolean;
  error: string;
}
