import { createActionGroup, props } from "@ngrx/store";


type User = { username: string, password: string };
type TokenResponse = { token: string, refreshToken: string };

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register': props<User>(),
    'Log in': props<User>(),

    'Authenticated': props<TokenResponse>(),
    'Failure': props<{ error: string }>(),

    'Log out': null as any,
    'Log out Success': null as any,

    'Refresh Token': props<User>(),
    'Refresh Token Success': props<{ token: string }>(),
  }
});
