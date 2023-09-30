import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions/auth.actions";
import { AuthState } from "../auth.state";
import jwt_decode from 'jwt-decode';
import { LoginResponse } from "src/app/dto";


const initialState: AuthState = {
  userId: '',
  expiresIn: Date.now(),

  accessToken: '',
  refreshToken: '',

  loading: false,
  error: '',
};

function process(data: LoginResponse) {
  const decodedToken: any = jwt_decode(data.accessToken);
  return {
    userId: decodedToken.sub,
    expiresIn: decodedToken.exp,
  };
}

export const authReducer = createReducer(
  initialState,

  /* log in */
  on(AuthActions.logIn, (state, _) => ({ ...state, loading: true })),

  on(AuthActions.authenticated, (state, data: LoginResponse) => {
    const { userId, expiresIn } = process(data);
    return {
      ...state,
      loading: false,
      error: '',
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      userId,
      expiresIn,
    }
  }),

  on(AuthActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /* log out */
  on(AuthActions.logOut, (state, _) => ({ ...state, loading: true })),
  on(AuthActions.logOutSuccess, (state, _) => ({
    ...state,
    error: '',
    loading: false,
    accessToken: '',
    refreshToken: '',
  })),

  /* refresh token */
  on(AuthActions.refreshToken, (state, _) => ({ ...state, loading: true })),
  on(AuthActions.refreshTokenSuccess, (state, data) => ({
    ...state,
    error: '',
    loading: false,
    accessToken: data.accessToken,
  })),

  /* register */
  on(AuthActions.register, (state, _) => ({ ...state, loading: true })),
);
