import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
    private router = inject(Router);
    private authService = inject(AuthService);
    private actions$ = inject(Actions);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logIn),
            switchMap((user) => this.authService.login(user)),
            map((data) => AuthActions.authenticated(data)),
            tap(() => this.router.navigate(['/profiles'])),
            catchError((error) => of(AuthActions.failure({ error })))
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap((user) => this.authService.register(user)),
            map((data) => AuthActions.authenticated(data)),
            tap(() => this.router.navigate(['/profiles'])),
            catchError((error) => of(AuthActions.failure({ error })))
        )
    );

    logut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logOut),
            switchMap(() => this.authService.logout()),
            map(() => AuthActions.logOutSuccess()),
            tap(() => this.router.navigate(['/auth'])),
            catchError((error) => of(AuthActions.failure({ error })))
        )
    );

    refreshToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.refreshToken),
            switchMap((refreshToken) => this.authService.refreshToken(refreshToken)),
            map((token) => AuthActions.refreshTokenSuccess(token)),
            catchError((error) => of(AuthActions.failure({ error })))
        )
    );
}
