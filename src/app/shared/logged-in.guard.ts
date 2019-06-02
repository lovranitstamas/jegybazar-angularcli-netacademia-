import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {Location} from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private _userService: UserService,
              private _router: Router,
              private _location: Location) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*if (this._userService.isLoggedIn) {
      return true;
    } else {
      //this._router.navigate(['/home']);
      this._location.back();
      return false;
    }*/

    return this._userService.isLoggedIn$.pipe(
      map(
        isLoggedIn => {
          if (isLoggedIn === false){
            this._router.navigate(['/home']);
            return false;
          } else {
            return true;
          }
        }
      )
    )
  }

}
