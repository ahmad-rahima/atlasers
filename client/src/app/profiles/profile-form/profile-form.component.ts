import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { selectProfile } from 'src/app/state/selectors/profile.selectors';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  private store = inject(Store);
  profiles$ = this.store.select(selectProfile);
  private authService = inject(AuthService);
  authed = false;

  async ngOnInit() {
  }
}
