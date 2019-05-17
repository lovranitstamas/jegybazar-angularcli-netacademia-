import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router) {
    this._allUsers = this._getMockData();
  }

  login(email: string, password: string): boolean {
    if (email === 'angular' && password === 'angular') {
      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedIn = true;
      this._router.navigate(['/user']);
    }

    console.log('Login: ' + this.isLoggedIn);
    return false;
  }

  register(param?: UserModel) {
    if (param) {
      this._user = new UserModel(param);
    } else {
      this._user = new UserModel(UserModel.exampleUser);
    }
    this.isLoggedIn = true;
    console.log('Login: ' + this.isLoggedIn);
    this._router.navigate(['/user']);
  }

  logout() {
    this._user = new UserModel();
    this.isLoggedIn = false;
    console.log('Login: ' + this.isLoggedIn);
    this._router.navigate(['/home']);
  }

  updateUser(param: UserModel) {
    this._user = new UserModel(param);
  }  

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
    return this._user;
  }

  private _getMockData() {
    return [
      new UserModel({
        id: 1,
        name: 'Pista ba',
        email: 'pistaba@pistaba.com',
        address: 'pistaba lak 12',
        dateOfBirth: '1900-01-01',
        gender: 'male',
        profilePictureUrl: 'https://www.minihero.hu/wp-content/uploads/funko-pop-ifju-satan.jpg'
      }),
      new UserModel({
        id: 2,
        name: 'Marcsa',
        email: 'marcsa@marcsa.hu',
        address: 'marcsa var 42.',
        dateOfBirth: '2000-01-01',
        gender: 'female',
        profilePictureUrl: 'https://www.minihero.hu/wp-content/uploads/funko-pop-ifju-satan.jpg'
      }),
      new UserModel({
        id: 3,
        name: 'ifju satan',
        email: 'mzx@mzx.hu',
        address: 'namek',
        dateOfBirth: '2199-02-01',
        gender: 'satan fattya',
        profilePictureUrl: 'https://www.minihero.hu/wp-content/uploads/funko-pop-ifju-satan.jpg'
      }),
    ];
  }
}
