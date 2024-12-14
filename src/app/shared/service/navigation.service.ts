import {Injectable} from "@angular/core";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {updateCurrentUrl, updateLastUrl} from "../store/actions";
import {Store} from "@ngrx/store";
import {LocalStorageService} from "./local-storage.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _excludedUrl: string[] = ['login-options', 'login', 'register'];
  private _currentUrl: string = '';

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private store$: Store) {
    this.startObserving();
  }

  private checkExcludedUrl(url: string) {
    return this._excludedUrl.some(value => url.includes(value));
  }

  private startObserving() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && !this.checkExcludedUrl(event.url)) {
        this.store$.dispatch(updateLastUrl({lastUrl: this._currentUrl}));
        this.localStorageService.setSavedState(event.url, 'lastUrl');
        this._currentUrl = event.url;
        this.store$.dispatch(updateCurrentUrl({currentUrl: event.url}));
        this.localStorageService.setSavedState(event.url, 'currentUrl');
      }
    });
  }
}
