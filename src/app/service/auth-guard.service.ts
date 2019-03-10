import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    else if (route.data.expectedRole === undefined) {
      return true;
    }
    else if(this.auth.getUserDetails().role !== route.data.expectedRole) {
      console.log(route.data.expectedRole);
      this.router.navigateByUrl('/vote');
      return true;
    }
    return true;
  }
}
