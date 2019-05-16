import {Component} from '@angular/core';
import {UserService} from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _userService: UserService) {
    this._userService.login('angular', 'angular');
  }

}

