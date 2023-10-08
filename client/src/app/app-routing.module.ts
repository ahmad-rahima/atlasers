import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, canActivateAuth } from './auth.guard';


const routes: Routes = [
  { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule), canActivate: [canActivate] },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule), canActivate: [canActivate] },
  { path: 'atlas', loadChildren: () => import('./navbar/atlas/atlas.module').then(m => m.AtlasModule), canActivate: [canActivate] },
  { path: 'browse', loadChildren: () => import('./browse/browse.module').then(m => m.BrowseModule), canActivate: [canActivate] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [canActivateAuth] },
  { path: '', redirectTo: '/profiles', pathMatch: 'full' },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
