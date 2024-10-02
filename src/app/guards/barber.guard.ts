import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {selectLoggedUser, selectUserSession } from '../auth/store/selectors';
import {map, take} from 'rxjs/operators';

import { UserSession } from '../auth/model/user-session.model';
import { Observable } from 'rxjs';
import { User } from '../auth/model/user.model';
import { UserRole } from '../auth/model/user-role.model';

@Injectable({
  providedIn: 'root'
})
export class BarberGuardService  {

    constructor(private store: Store, private router: Router) {}
  
  



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
          select(selectLoggedUser),
          map((user: User) => {
            if (!user || user.userRole !== UserRole.BARBER) {
              this.router.navigate(['home']);
              return false;
            }
            return true;
          }),
          take(1)
        );
      }
    
      canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
      }



  }


  export const barberGuard: CanActivateFn = (route, state) => {
    const barberGuardService = inject(BarberGuardService);
    return barberGuardService.canActivate(route, state);
  };