import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

const routes: Routes = [
  { path: '', component: ProfilesComponent, pathMatch: 'full' },
  { path: 'form', component: ProfileFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
