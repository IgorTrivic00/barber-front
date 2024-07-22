import {inject, Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn, HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  first,
  mergeMap,
  Observable, of,
  switchMap,
  take,
  throwError
} from "rxjs";
import {AuthConfiguration} from "../auth/auth.configuration";
import {Store} from "@ngrx/store";
import {selectToken} from "../auth/store/selectors";
import {jwtDecode} from 'jwt-decode';
import {Actions, ofType} from "@ngrx/effects";
import {extendTokenExpirationDate, extendTokenExpirationDateSuccess, logout} from "../auth/store/actions";
import {KeepAliveRequest} from "../auth/model/request_response/keep-alive.request";
import {closeSpinner, showMessage} from "../shared/store/actions";
import {Severity} from "../shared/constants/constants";

interface BackErrorResponse {
  message: string;
  errorCode: string;
  httpStatus: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService{

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshing = false;

  constructor(private authConfig: AuthConfiguration,
              private action$: Actions,
              private store$: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let excludedEndPoint = false;
    this.authConfig.excludedEndPoints.forEach(endPoint => {
      if (req.url === endPoint) {
        excludedEndPoint = true;
      }
    });

    const request = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });

    if (excludedEndPoint) {
      return next(request);
    } else {
      return this.getAuthToken().pipe(
        mergeMap(token => {
          let tokenExpirationMinutes;

          if (token) {
            try {
              const value = jwtDecode(token) as any;

              tokenExpirationMinutes = ((((Math.round(Date.now() -
                new Date(value.exp * 1000).getTime())) % 86400000) % 3600000) / 60000);
              if (tokenExpirationMinutes > -1 && tokenExpirationMinutes < 0) {
                return this.refreshToken(token, request, next);
              } else {
                const authRequest = this.addToken(request, token);

                return this.handleRequest(authRequest, next, token);
              }
            } catch (e) {
              console.error('Couldn\'t parse jwt token, ', e);
            }
          } else {
            return this.handleRequest(request, next);
          }
          return of()
        })
      );
    }
  }

  private getAuthToken(): Observable<string | null> {
    return this.store$.select(selectToken).pipe(first());
  }

  private refreshToken(oldToken: string, request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      this.store$.dispatch(extendTokenExpirationDate(
        {keepAliveRequest: {token: oldToken} as KeepAliveRequest}));
      return this.action$.pipe(
        ofType(extendTokenExpirationDateSuccess),
        switchMap(action => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(action.keepAliveResponse.newToken);
          return this.handleRequest(this.addToken(request, action.keepAliveResponse.newToken), next);
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return this.handleRequest(this.addToken(request, jwt), next);
        }));
    }
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandlerFn, token?: string): Observable<any> {
    return next(req).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403 || err.status === 0) {
          if (token) {
            this.store$.dispatch(logout());
            this.store$.dispatch(showMessage({severity: Severity.INFO, detail: 'Vaša sesija je istekla. Prijavite se ponovo.'}));
          }
        }
        if (err.error instanceof Blob) {
          return this.parseErrorBlob(err);
        } else {
          this.showErrorMessage(err);
          return throwError(err);
        }
      }),
      finalize(() => {
      })
    );
  }

  private parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();
    const obs = new Observable((observer: any) => {
      reader.onloadend = (e) => {
        try {
          const error = new HttpErrorResponse({
            ...err,
            error: JSON.parse(reader.result as string),
            url: err.url ?? undefined
          });
          this.showErrorMessage(error);
          observer.error(error);
        } catch (parseError) {
          observer.error(err);
        }
        observer.complete();
      };
    });
    reader.readAsText(err.error);
    return obs;
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private showErrorMessage(error: HttpErrorResponse): void {
    const backError = error.error as BackErrorResponse;
    const message = backError.message === 'unknown.error' ? backError.errorCode : backError.message;
    this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Greška: ' + message}));
    this.store$.dispatch(closeSpinner());
  }
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthInterceptorService);
  return authService.intercept(req, next);
};
