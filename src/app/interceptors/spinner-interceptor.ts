import {inject, Injectable} from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from "../shared/service/spinner.service";

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService {

  spinnerService = inject(SpinnerService);

  intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });

    this.spinnerService.spin();
    return next(request).pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const spinnerService = inject(SpinnerInterceptorService);
  return spinnerService.intercept(req, next);
};
