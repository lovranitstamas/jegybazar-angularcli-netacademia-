import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserModel } from '../../shared/user-model';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  
  user: UserModel;
  //close all subscription
  private _destroy$ = new Subject<void>();
  //private _destroy$: Subject<void> = new Subject(); 

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() { 
    //this.user = this._userService.isLoggedIn ? this._userService.getCurrentUser() : new UserModel();
    this._userService.getCurrentUser().pipe(
      takeUntil(this._destroy$))
      .subscribe(user => (this.user = user));
  }

  ngOnDestroy() {
    //through the takeUntil function will be closed all stream
    //in this case it is not absolutely necessary because all http stream close itself
    // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    this._destroy$.next();
    this._destroy$.complete();
  }

  /*onSubmit() { 
    //this._userService.updateUser(this.user); 
    if (this.user.id) { 
      this._userService.updateUser(this.user); 
    } else { 
      this._userService.register(this.user);  
    } 
    this._router.navigate(['/user']); 
  } */

  createUser(pass: string) { 
    this._userService.register(this.user, pass)
    .pipe(
        takeUntil(this._destroy$)
    ) 

    .subscribe( 
      () => this._goToProfile(), 
      err => console.warn('registracio kozben problemank adodott: ', err) 
    );  
  } 

  updateUser() { 
    this._userService.save(this.user)
    .pipe(
      takeUntil(this._destroy$)
    ) 
    .subscribe( 
      () => this._goToProfile(), 
      err => console.warn('user save kozben problemank adodott: ', err) 
    );
  }

  private _goToProfile() {
    this._router.navigate(['/user']); 
  } 
}
