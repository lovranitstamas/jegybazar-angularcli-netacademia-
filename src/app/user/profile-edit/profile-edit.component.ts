import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  user: UserModel;
  registerMode = false;
  // close all subscription
  private _destroy$ = new Subject<void>();
  // private _destroy$: Subject<void> = new Subject();

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._userService.getCurrentUser().pipe(
      takeUntil(this._destroy$))
      .subscribe(user => {
        this.user = user;
        if (user == null) {
          this.registerMode = true;
          this.user = new UserModel();
        }
      });
  }

  ngOnDestroy() {
    // through the takeUntil function will be closed all stream
    // in this case it is not absolutely necessary because all http stream close itself
    // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    this._destroy$.next();
    this._destroy$.complete();
  }

  createUser(pass: string) {
    this._userService.register(this.user, pass)
      .subscribe(
        () => this._goToProfile(),
        err => console.warn('registracio kozben problemank adodott: ', err)
      );
  }

  updateUser() {
    this._userService.save(this.user);
    this._goToProfile();
  }

  private _goToProfile() {
    this._router.navigate(['/user']);
  }
}
