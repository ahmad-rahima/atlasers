import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, map, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuth } from './state/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private store = inject(Store<{ authSelect: any }>);
  private auth$ = this.store.select(selectAuth);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth$.pipe(
      take(1),
      tap(data => console.log(data)),
      map(v => {
        if (v && (v as any).accessToken) {
          const newReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${(v as any).accessToken}`),
          });
          console.log(newReq);
          return newReq;
        }

        return request;
      }),
      switchMap(req => next.handle(req)),
    );
  }
}
