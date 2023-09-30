import { Component, OnInit, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  private authService = inject(AuthService);
  authed = false;

  async ngOnInit() {
    this.authed = await lastValueFrom(this.authService.isAuthorized());
  }
}
