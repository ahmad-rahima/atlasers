import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { PostsModule } from '../posts/posts.module';


@NgModule({
  declarations: [
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    PostsModule,
  ]
})
export class ProfilesModule { }