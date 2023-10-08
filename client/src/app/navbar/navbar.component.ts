import { Component, HostListener, TemplateRef, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../state/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private store = inject(Store);
  @ViewChild('navOthers') navOthers: any;

  onLogOut() {
    this.store.dispatch(AuthActions.logOut());
  }

  onShowNav() {
    console.log(this.navOthers.nativeElement.style);
    this.navOthers.nativeElement.style.display =
      this.navOthers.nativeElement.style.display === 'none' ? 'block'
        : 'none';
  }
}
