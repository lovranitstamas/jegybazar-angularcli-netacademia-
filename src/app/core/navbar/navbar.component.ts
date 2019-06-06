import {Component, DoCheck, AfterViewChecked, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements DoCheck, AfterViewChecked, AfterViewInit {
  public isCollapsed = true;
  isLoggedIn = false;

  constructor(
    public userService: UserService,
    private cdr: ChangeDetectorRef) {
      this.userService.isLoggedIn$.subscribe(
        isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
          this.cdr.detectChanges();
        }
      )
  }

  ngDoCheck(){
    console.log("navbar docheck");
  }

  ngAfterViewChecked(){
    console.log("navbar afterviewchecked");
  }

  ngAfterViewInit(){
    this.cdr.detach();
  }

  logout() {
    this.userService.logout();
  }
}
