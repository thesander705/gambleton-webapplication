import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from '../UserService';

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {

  private userService: UserService;
  private router: Router;


  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAdmin = this.userService.IsAdmin();
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
