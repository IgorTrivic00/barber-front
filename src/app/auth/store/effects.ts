import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {
  extendTokenExpirationDate,
  extendTokenExpirationDateSuccess,
  login,
  loginSuccess,
  logout,
  logoutSuccess, redirectAfterLogin, redirectToLoginPage,
  register,
  registerSuccess
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
    switchMap(action => this.authApiService.login(action.user).pipe(
      switchMap(response => {
        this.localStorageService.setSavedState(response, 'userSession');
        return of(
          loginSuccess({user: response}),
          redirectAfterLogin({redirectUrl: ['home']}),
          showMessage({severity: Severity.SUCCESS, detail: 'Uspešna prijava'}),
        )
      })
    ))
  ));

  registerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    switchMap(action => this.authApiService.register(action.user).pipe(
      switchMap(response => {
        return of(
          registerSuccess({user: response}),
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
          redirectToLoginPage(),
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
    map(action => action.redirectUrl),
    tap(redirectUrl => {
      this.router.navigate(redirectUrl);
    })
  ), {dispatch: false});

  redirectToLoginPageEffect$ = createEffect(() => this.actions$.pipe(
    ofType(redirectToLoginPage),
    tap(() => {
      this.router.navigate(['auth', 'login']);
    })
  ), {dispatch: false});

  logoutSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logoutSuccess),
    tap(() => {
      this.localStorageService.setSavedState(null, 'userSession');
    })
  ), {dispatch: false});
}
