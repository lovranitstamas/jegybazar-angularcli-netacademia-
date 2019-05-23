import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import { Router } from '@angular/router';
import { UserModel } from '../../shared/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error: string;

  constructor(private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  /*login(email: string, password: string) {
    if (!this._userService.login(email, password)) {
      this.error = 'Hiba a belépésnél';
    } else {
      this._router.navigate(['/user']);
    }
  }*/
  
  login(email: string, password: string) {
    this._userService.login(email, password).subscribe(
      (user: UserModel) => {
        //console.log('login cmp', user);
        this._router.navigate(['/user']);
      },
      err => {
        //console.warn('Hibára futottunk a logincmp-ben', err);
        this.error = 'Hiba a belépésnél';
      });
  }

  clearError() {
    delete(this.error);
  }
}
