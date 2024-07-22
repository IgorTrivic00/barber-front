import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {closeSpinner, openSpinner} from "../shared/store/actions";

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService {

  constructor(private store$: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });

    this.store$.dispatch(openSpinner());
    return next(request).pipe(
      finalize(() => {
        this.store$.dispatch(closeSpinner());
      })
    );
  }
}

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const spinnerService = inject(SpinnerInterceptorService);
  return spinnerService.intercept(req, next);
};
