import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {map, Observable, take} from "rxjs";
import {selectUserSession} from "../auth/store/selectors";
import {UserSession} from "../auth/model/user-session.model";
import {redirectToLoginPage} from "../auth/store/actions";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(protected store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectUserSession),
      map((session: UserSession) => {
        if (!session || !session.user) {
          this.store.dispatch(redirectToLoginPage());
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


export const authGuard: CanActivateFn = (route, state) => {
  const authGuardService = inject(AuthGuardService);
  return authGuardService.canActivate(route, state);
};
