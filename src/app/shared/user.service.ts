import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {FirebaseRegistrationModel} from './firebase-registration-model'; 
import {switchMap,tap,map, flatMap} from 'rxjs/operators'; 
import {ReplaySubject} from 'rxjs'; 
import * as firebase from 'firebase'; 
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1); 

  private _user = new ReplaySubject<UserModel>(1);
  private _fbAuthData: any; 

  constructor(private _router: Router,
              private _http: HttpClient) {
    firebase.auth().onAuthStateChanged( 
      (user) => { 
        if (user != null) {
          this._fbAuthData = user; 
          this.getUserById(user.uid).subscribe(remoteUser => {
            //console.log(remoteUser);
            this._user.next(remoteUser);
          });
          this.isLoggedIn$.next(true); 
        } else { 
          this._fbAuthData = null;
          this._user.next(null); 
          this.isLoggedIn$.next(false); 
        } 
      } 
    ); 

    //subject - both part can send
    //in login no next, only subscriber, can not send
  }
  
  login(email: string, password: string) { 
    return from(
      firebase.auth().signInWithEmailAndPassword(email,password)
    );
  }

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apiKey}`,
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
              tap(user => console.log('sikeres reg ezzel a userrel: ', user))
            )     
          )
      )
  }

  save(param: UserModel) {
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}.json`, param)
  }

  getUserById(fbid: string) { 
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`); 
  } 

  getCurrentUser() {
    return this._user.asObservable();
  }

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`).pipe(
      map(usersObject => Object.values(usersObject).map(user => new UserModel(user)))
    );
  }

  logout(){
    firebase.auth().signOut();
    this._router.navigate(['/home']);
  }

  addTicket(ticketId: string): Observable<string> {
    return this._user.pipe(
      flatMap(user => {
        return this._http.patch( 
          `${environment.firebase.baseUrl}/users/${user.id}/tickets.json`, 
          {[ticketId]: true}
        ).pipe( 
          map(rel => Object.keys(rel)[0])
        )
      })
    ); 
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
