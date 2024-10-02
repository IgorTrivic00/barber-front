import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {
  extendTokenExpirationDate,
  extendTokenExpirationDateSuccess,
  login,
  loginSuccess,
  logout,
  logoutSuccess, redirectAfterLogin, redirectToLoginPage,
  registerCustomer,
  registerCustomerSuccess
} from "./actions";
import {concatMap, map, of, switchMap, tap, timeout, withLatestFrom} from "rxjs";
import {AuthApiService} from "../api/auth-api.service";
import {select, Store} from "@ngrx/store";
import {closeSpinner, openSpinner, showMessage} from "../../shared/store/actions";
import {Severity} from "../../shared/constants/constants";
import {selectUserSession} from "./selectors";
import {User} from "../model/user.model";
import {KeepAliveResponse} from "../model/request_response/keep-alive.response";
import {UserSession} from "../model/user-session.model";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {selectLastUrl} from "../../shared/store/selectors";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private store$: Store,
              private router: Router,
              private localStorageService: LocalStorageService,
              private authApiService: AuthApiService) {
  }

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectLastUrl)))
    )),
    switchMap(([action, lastUrl]) => {
      return this.authApiService.login(action.user).pipe(
        switchMap(response => of(
          loginSuccess({user: response}),
          redirectAfterLogin({redirectUrl: lastUrl}),
          showMessage({severity: Severity.SUCCESS, detail: 'Uspešna prijava'}),
        )));
    })
  ));

  registerCustomerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(registerCustomer),
    switchMap(action => this.authApiService.registerCustomer(action.request).pipe(
      switchMap(response => {
        return of(
          registerCustomerSuccess({customer: response}),
          showMessage({severity: Severity.SUCCESS, detail: 'Uspešna registracija'}),
          redirectToLoginPage(),
        )
      })
    ))
  ));

  logoutEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectUserSession)))
    )),
    switchMap(([action, userSession]) => {
      return this.authApiService.logout(userSession).pipe(
        switchMap(response => of(
          logoutSuccess(),
          showMessage({severity: Severity.SUCCESS, detail: 'Uspešna odjava'}),
        )));
    })
  ));

  extendTokenExpirationDateEffect$ = createEffect(() => this.actions$.pipe(
    ofType(extendTokenExpirationDate),
    switchMap(action => this.authApiService.keepAlive(action.keepAliveRequest).pipe(
      switchMap((keepAliveResponse: KeepAliveResponse) => {
        return of(extendTokenExpirationDateSuccess({keepAliveResponse}));
      }),
    ))
  ));

  redirectAfterLoginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(redirectAfterLogin),
    tap(action => {
      this.router.navigate([action.redirectUrl]);
    })
  ), {dispatch: false});

  redirectToLoginPageEffect$ = createEffect(() => this.actions$.pipe(
    ofType(redirectToLoginPage),
    tap(() => {
      this.router.navigate(['auth', 'login-options']);
    })
  ), {dispatch: false});

  loginSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    map(action => action.user),
    tap((userSession) => {
      this.localStorageService.setSavedState(userSession, 'userSession');
      return of();
    })
  ), {dispatch: false});

  logoutSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logoutSuccess),
    tap(() => {
      this.localStorageService.setSavedState(null, 'userSession');
      this.router.navigate(['home']);
    })
  ), {dispatch: false});
}
