import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn;
  showNav = true;
  isDrawerOpened = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.checkLoginStatus();
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.isDrawerOpened = true;
      }
    });
  }
  toggleNav() {
    this.showNav = !this.showNav;
  }
  logout() {
    this.authService.logout();
    this.isDrawerOpened = false;
    this.router.navigate(['/login']);

  }

  title = 'BillyPanel';
}
