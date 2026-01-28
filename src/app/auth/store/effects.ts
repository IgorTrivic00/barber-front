import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject, Injectable} from "@angular/core";
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
import {concatMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import {AuthApiService} from "../api/auth-api.service";
import {select, Store} from "@ngrx/store";
import {Severity} from "../../shared/constants/constants";
import {selectUserSession} from "./selectors";
import {KeepAliveResponse} from "../model/request_response/keep-alive.response";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {selectCurrentUrl} from "../../shared/store/selectors";
import {ToastrService} from "../../shared/service/toastr.service";

@Injectable()
export class AuthEffects {

  toastService = inject(ToastrService);

  constructor(private actions$: Actions,
              private store$: Store,
              private router: Router,
              private localStorageService: LocalStorageService,
              private authApiService: AuthApiService) {
  }

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectCurrentUrl)))
    )),
    switchMap(([action, currentUrl]) => {
      return this.authApiService.login(action.user).pipe(
        switchMap(response => of(
          loginSuccess({user: response}),
          redirectAfterLogin({redirectUrl: currentUrl}),
          // this.toastService.showMessage(Severity.SUCCESS,'Uspešna prijava')
        )));
    })
  ));

  registerCustomerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(registerCustomer),
    switchMap(action => this.authApiService.registerCustomer(action.request).pipe(
      switchMap(response => {
        return of(
          registerCustomerSuccess({customer: response}),
          // this.toastService.showMessage(Severity.SUCCESS,'Uspešna registracija'),
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
          // this.toastService.showMessage(Severity.SUCCESS,'Uspešna odjava'),
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

  loginSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(action => {
      this.localStorageService.setSavedState(action.user, 'userSession');
    })
  ), {dispatch: false});

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

  logoutSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logoutSuccess),
    tap(() => {
      this.localStorageService.setSavedState(null, 'userSession');
      this.router.navigate(['home']);
    })
  ), {dispatch: false});
}
