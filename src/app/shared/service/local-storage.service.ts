import {Injectable} from "@angular/core";
import {UserSession} from "../../auth/model/user-session.model";
import {Store} from "@ngrx/store";
import {loginSuccess} from "../../auth/store/actions";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private store$: Store) {}

  setSavedState(state: any, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): any {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(localStorageKey));
  }

  mapLocalStorageToStore(){
    const userSession: UserSession = this.getSavedState('userSession');
    if(userSession){
      this.store$.dispatch(loginSuccess({user: userSession}))
    }
  }

}
