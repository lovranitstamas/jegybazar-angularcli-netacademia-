import {Component} from '@angular/core';
import {UserService} from './shared/user.service';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: ReplaySubject<boolean>;

  constructor(
    userService: UserService
  ) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }

}

