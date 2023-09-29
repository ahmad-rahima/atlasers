import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../state/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private store = inject(Store);

  onLogOut() {
    this.store.dispatch(AuthActions.logOut());
  }
}
