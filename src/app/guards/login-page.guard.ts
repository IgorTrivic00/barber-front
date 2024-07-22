import {inject, Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {selectUserSession} from "../auth/store/selectors";
import {UserSession} from "../auth/model/user-session.model";
import {AuthGuardService} from "./auth.guard";


@Injectable({
  providedIn: 'root',
})
export class LoginPageGuardService {

  constructor(protected store: Store,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectUserSession),
      map((session: UserSession) => {
        if (!session || session.user) {
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

export const loginPageGuard: CanActivateFn = (route, state) => {
  const loginPageGuardService = inject(LoginPageGuardService);
  return loginPageGuardService.canActivate(route, state);
};
