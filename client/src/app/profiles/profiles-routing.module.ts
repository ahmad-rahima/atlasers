import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { PostFormComponent } from './post-form/post-form.component';

const routes: Routes = [
  { path: 'form', component: ProfileFormComponent },
  {
    path: '',
    component: ProfilesComponent,
    // pathMatch: 'full',
    children: [
      { path: 'post-form', component: PostFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
