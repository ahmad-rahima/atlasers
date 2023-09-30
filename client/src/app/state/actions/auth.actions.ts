import { createActionGroup, props } from "@ngrx/store";
import {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterRequest
} from "src/app/dto";


export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register': props<RegisterRequest>(),
    'Log in': props<LoginRequest>(),

    'Authenticated': props<LoginResponse>(),  // same  as RegisterRequest
    'Failure': props<{ error: string }>(),

    'Log out': null as any,
    'Log out Success': null as any,

    'Refresh Token': props<RefreshTokenRequest>(),
    'Refresh Token Success': props<RefreshTokenResponse>(),
  }
});
