import {Injectable} from "@angular/core";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {updateLastUrl} from "../store/actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private excludedUrl: string[] = ['login-options', 'login', 'register']

  constructor(private router: Router,
              private store$: Store) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && !this.checkExcludedUrl(event.url)) {
        this.store$.dispatch(updateLastUrl({lastUrl: event.url}));
      }
    });
  }

  private checkExcludedUrl(url: string) {
    return this.excludedUrl.some(value => url.includes(value));
  }

}
