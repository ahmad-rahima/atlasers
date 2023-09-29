import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AnimalInfoComponent } from './atlas/animal-info/animal-info.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
import { authSelect } from './state/selectors/auth.selectors';
import { authReducer } from './state/reducers/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AnimalInfoComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      'auth': authReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true // If set to true, the connection is established outside the Angular zone for better performance
    }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
