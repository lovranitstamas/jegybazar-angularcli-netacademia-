import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {from, Observable, ReplaySubject} from 'rxjs';
import {flatMap, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  private _user = new ReplaySubject<UserModel>(1);

  constructor(private _router: Router,
              private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase,
              private _http: HttpClient
  ) {
    this.afAuth.authState.subscribe(
      user => {
        if (user != null) {
          this.getUserById(user.uid).valueChanges().subscribe(
            (remoteUser: UserModel) => this._user.next(remoteUser)
          );
          this.isLoggedIn$.next(true);
        } else {
          this._user.next(null);
          this.isLoggedIn$.next(false);
        }
      }
    );
    // subject - both part can send
    // in login no next, only subscriber, can not send
  }

  login(email: string, password: string) {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  register(param: UserModel, password: string) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(param.email, password)
    ).pipe(
      tap(
        (response) => {
          this.save({ ...param, id: response.user.uid });
        }
      )
    );
  }

  save(param: UserModel) {
    return this.afDb.object(`users/${param.id}`).set(param)
      .then(
        user => user
      );
  }

  getUserById(fbid: string): AngularFireObject<UserModel>  {
    return this.afDb.object(`users/${fbid}`);
  }

  getUserByIdHttp(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }

  getCurrentUser() {
    return this._user.asObservable();
  }

  /*getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`).pipe(
      map(usersObject => Object.values(usersObject).map(user => new UserModel(user)))
    );
  }*/

  logout() {
    this.afAuth.auth.signOut();
    this._router.navigate(['/home']);
  }

  addTicket(ticketId: string): Observable<any> {
    return this._user.pipe(
      flatMap(user => {
          return this.afDb.list(`users/${user.id}/tickets`).push({[ticketId]: true});
        }
      )
    );
  }

  /*private _getMockData() {
    return [
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
    ];
  }*/
}
