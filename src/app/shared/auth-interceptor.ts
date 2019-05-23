import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userService = this._injector.get(UserService)
    if (userService.isLoggedIn && req.url.includes('firebaseio')) {
      const reqWithIdToken = req.clone({url: `${req.url}?auth=`});
      return next.handle(reqWithIdToken);
    } else {
      return next.handle(req);
    }
  }
}