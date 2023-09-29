import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    private router = inject(Router);
    private auth = inject(AuthService);

    canActivate() {
        return this.auth.isAuthorized().pipe(
            map(authed => authed ? true : this.router.parseUrl('/auth'))
        );
    }

    canActivateAuth() {
        return this.auth.isAuthorized().pipe(
            map(authed => authed ? this.router.parseUrl('/profiles') : true)
        );
    }
}

export const canActivate: CanActivateFn =
    (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
    inject(AuthGuardService).canActivate();

export const canActivateAuth: CanActivateFn =
    (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
    inject(AuthGuardService).canActivateAuth();
