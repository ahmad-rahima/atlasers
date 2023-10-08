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

  protected store = inject(Store);
  protected auth$ = this.store.select(selectAuth) as Observable<AuthState>;

  fileDataUrl = '';
  file: any = null;

  onFileInput(event: any) {
    console.log(event.target.files);

    let fr = new FileReader();
    fr.onload = (_data) => {
      console.log(fr.result);
      this.fileDataUrl = fr.result as string;
    }
    fr.readAsDataURL(event.target.files[0]);

    this.file = event.target.files[0];
  }

  onSubmit(form: NgForm) {}
}
