import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  private _user: UserModel;

  constructor(private _router: Router) {
  }

  login(email: string, password: string): boolean {
    if (email === 'angular' && password === 'angular') {

      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedIn = true;
      this._router.navigate(['/user']);

    }

    return false;
  }
}
