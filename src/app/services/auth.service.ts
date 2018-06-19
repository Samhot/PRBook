import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  constructor (private router: Router) {}
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => {this.isLoggedIn = true; localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn)); })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
    this.router.navigate(['/dashboard']);
  }
}
