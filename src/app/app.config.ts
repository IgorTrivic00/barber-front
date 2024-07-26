import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {appReducer} from "./root-store/reducers";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {CommonEffects} from "./shared/store/effects";
import {authInterceptor} from "./interceptors/auth-interceptor";
import {spinnerInterceptor} from "./interceptors/spinner-interceptor";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {MessageService} from "primeng/api";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AuthEffects} from "./auth/store/effects";
import { provideServiceWorker } from '@angular/service-worker';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor, spinnerInterceptor])),
    provideStore(appReducer), provideEffects([CommonEffects, AuthEffects]), provideStoreDevtools({ maxAge: 25 }), MessageService,
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
