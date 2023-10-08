import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuth } from './state/selectors/auth.selectors';
import { filter, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  authView = false;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authView = this.router.url.startsWith('/auth');
    });
  }
}
