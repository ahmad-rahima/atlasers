import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { PostsModule } from '../posts/posts.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileFormAddComponent } from './profile-form/profile-form-base/profile-form-add/profile-form-add.component';
import { ProfileFormUpdateComponent } from './profile-form/profile-form-base/profile-form-update/profile-form-update.component';
import { ProfileFormBaseComponent } from './profile-form/profile-form-base/profile-form-base.component';
import { PostFormComponent } from './post-form/post-form.component';


@NgModule({
  declarations: [
    ProfilesComponent,
    ProfileFormComponent,
    ProfileFormBaseComponent,
    ProfileFormAddComponent,
    ProfileFormUpdateComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    PostsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfilesModule { }
