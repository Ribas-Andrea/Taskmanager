import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {

  public isAuthenticated = signal(false);

  constructor (private router: Router) {
    this.isAuthenticated.set(localStorage.getItem('token') != null)
  }

  public logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
