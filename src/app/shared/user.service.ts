import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {FirebaseLoginModel} from './firebase-login-model';
import {FirebaseRegistrationModel} from './firebase-registration-model'; 
import {switchMap,tap,map} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  private _user: UserModel;
  private _fbAuthData: FirebaseLoginModel | FirebaseRegistrationModel | undefined; 
  //private _allUsers: UserModel[];

  constructor(private _router: Router,
              private _http: HttpClient) {
    //this._allUsers = this._getMockData();
  }

  get fbIdToken(): string | null {  
    return this._fbAuthData ? this._fbAuthData.idToken : null;  
  } 

 /* login(email: string, password: string): boolean {
    if (email === 'angular' && password === 'angular') {
      //this._user = new UserModel(UserModel.exampleUser);
      this._user = this._allUsers[0];
      this.isLoggedIn = true;
      //this._router.navigate(['/user']);
      return true;
    }

    console.log('Login: ' + this.isLoggedIn);
    return false;
  }*/
  
  /*login(email: string, password: string): Observable<UserModel> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      }).pipe(
        switchMap(fbLogin => this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`)
          .pipe(
            tap(user => this.isLoggedIn = true), 
            tap(user => this._user = user) 
          )
        )
      );
  }*/
   
  login(email: string, password: string): Observable<UserModel> {   
    return this._http.post<FirebaseLoginModel>(  
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,  
      {  
        'email': email,  
        'password': password,  
        'returnSecureToken': true  
      }).pipe(  
        tap((fbAuthResponse: FirebaseLoginModel) => this._fbAuthData = fbAuthResponse), 
        switchMap(fbLogin => this.getUserById(fbLogin.localId) 
          .pipe( 
            tap(user => this._user = user), 
            tap(user => this.isLoggedIn = true), 
            tap(user => console.log('sikeres login ezzel a userrel: ', user)) 
          ) 
        ) 
      ) 
  }  

  /*register(param?: UserModel) {
    if (param) {
      this._user = new UserModel({
        id: 4,
        ...param
      });

      this._allUsers = [
        ...this._allUsers,
        this._user
      ];
    }
    if (param) {
      this._user = new UserModel(param);
    } else {
      this._user = new UserModel(UserModel.exampleUser);
    }
    this.isLoggedIn = true;
    console.log('Login: ' + this.isLoggedIn);
    //this._router.navigate(['/user']);
  }*/

  /*
  updateUser(param: UserModel) {
    this._user = new UserModel(param);
  }*/

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apikey}`,
      {
        'email': param.email,
        'password': password,
        'returnSecureToken': true
      }).pipe(
          tap((fbAuthResponse: FirebaseRegistrationModel) => this._fbAuthData = fbAuthResponse),
          map(fbreg => {
            return {
              id: fbreg.localId,
              ...param
            };
          }),
          switchMap(user => this.save(user)
            .pipe(
              tap(user => this.isLoggedIn = true),
              tap(user => console.log('sikeres reg ezzel a userrel: ', user))
            )     
          )
      )
  }

  save(param: UserModel) {
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}.json`, param)
      .pipe(
        tap(user => this._user = user)
      );
  }

  /*getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }*/

  getUserById(fbid: string) { 
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`); 
  } 

  getCurrentUser() {
    return this._user;
    //return this._user ? this._user : new UserModel(UserModel.emptyUser);
    //return of(this._user);  
  }

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`).pipe(
      map(usersObject => Object.values(usersObject).map(user => new UserModel(user)))
    );
  }

  logout() {
    this._user = new UserModel();
    this.isLoggedIn = false;
    delete(this._fbAuthData);
    this._router.navigate(['/home']);
    console.log('Login: ' + this.isLoggedIn);
  }

  private _getMockData() {
    /*return [
      new UserModel({
        id: 1,
        name: 'Pista ba',
        email: 'pistaba@pistaba.com',
        address: 'pistaba lak 12',
        dateOfBirth: '1900-01-01',
        gender: 'male',
        profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nBubms8tp5EDXG6LBhVyy4AES2WCqceh674hyF6rNwjYoJ4ddQ'
      }),
      new UserModel({
        id: 2,
        name: 'Marcsa',
        email: 'marcsa@marcsa.hu',
        address: 'marcsa var 42.',
        dateOfBirth: '2000-01-01',
        gender: 'female',
        profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nBubms8tp5EDXG6LBhVyy4AES2WCqceh674hyF6rNwjYoJ4ddQ'
      }),
      new UserModel({
        id: 3,
        name: 'ifju satan',
        email: 'mzx@mzx.hu',
        address: 'namek',
        dateOfBirth: '2199-02-01',
        gender: 'satan fattya',
        profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nBubms8tp5EDXG6LBhVyy4AES2WCqceh674hyF6rNwjYoJ4ddQ'
      }),
    ];*/
  }
}
