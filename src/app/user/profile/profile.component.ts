import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { UserModel } from '../../shared/user-model';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserModel;
  private _subs: Subscription;  

  constructor(private _userService: UserService) { }

  ngOnInit() {
    //this.user = this._userService.getCurrentUser();
    this._subs = this._userService.getCurrentUser().subscribe(user => this.user = user);  
  }

  ngOnDestroy() {  
    //practise 
    this._subs.unsubscribe();  
  }

}
