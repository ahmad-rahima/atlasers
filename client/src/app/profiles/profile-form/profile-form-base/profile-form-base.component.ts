import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuth } from 'src/app/state/selectors/auth.selectors';
import { AuthState } from 'src/app/state/auth.state';
import { Observable } from 'rxjs';
import { ProfilesService } from '../../profiles.service';

@Component({
  templateUrl: './profile-form-base.component.html',
  styleUrls: ['./profile-form-base.component.scss']
})
export class ProfileFormBaseComponent {
  protected method!: string;
  protected profilesService = inject(ProfilesService);

  private store = inject(Store);
  protected auth$ = this.store.select(selectAuth) as Observable<AuthState>;

  onSubmit(form: NgForm) {}
}
