import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/actions/auth.actions';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private store = inject(Store);
  // token$ = this.store.select(authSelect);


  onRegister(form: NgForm) {
    const { username, password } = form.form.value;
    this.store.dispatch(AuthActions.register({ username, password }));
  }
}
