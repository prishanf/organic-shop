import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) {

  }

  canActivate(router): Observable<boolean> {
    return this.auth.user$
      .switchMap(user =>{ console.log(user,user.uid); return this.userService.get(user.uid) })
      .map(appUser=>{console.log(appUser,appUser.isAdmin); return appUser.isAdmin});

  }

}
