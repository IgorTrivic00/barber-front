import {inject, Injectable} from "@angular/core";
import {UserSession} from "../../auth/model/user-session.model";
import {Store} from "@ngrx/store";
import {loginSuccess} from "../../auth/store/actions";
import {updateCurrentUrl, updateLastUrl} from "../store/actions";
import {Barber} from "../../auth/model/barber.model";
import {Service} from "../../main/model/service.model";
import {ServiceService} from "../../main/services/service.service";
import {BarberService} from "../../main/services/barber.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private serviceService = inject(ServiceService);
  private barberService = inject(BarberService);

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
    const lastUrl: string = this.getSavedState('lastUrl');
    const currentUrl: string = this.getSavedState('currentUrl');
    const selectedService: Service = this.getSavedState('selectedService');
    const selectedBarber: Barber = this.getSavedState('selectedBarber');
    if(userSession){
      this.store$.dispatch(loginSuccess({user: userSession}))
    }
    if(lastUrl){
      this.store$.dispatch(updateLastUrl({lastUrl}));
    }
    if(currentUrl){
      this.store$.dispatch(updateCurrentUrl({currentUrl}));
    }
    if(selectedBarber){
      this.barberService.selectBarber(selectedBarber);
    }
    if(selectedService){
      this.serviceService.selectService(selectedService);
    }
  }

}
