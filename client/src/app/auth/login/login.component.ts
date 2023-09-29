import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authSelect, tokenSelect } from '../../state/selectors/auth.selectors';
import { AuthActions } from '../../state/actions/auth.actions';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private store = inject(Store);
  // token$ = this.store.select(authSelect);


  onLogin(form: NgForm) {
    const { username, password } = form.form.value;
    this.store.dispatch(AuthActions.logIn({ username, password }));
  }

  onLogout() {
    this.store.dispatch(AuthActions.logOut());
  }
}
