import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login-service.service';
@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {

  constructor(private loginService: LoginService,
     private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.userLogged) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}