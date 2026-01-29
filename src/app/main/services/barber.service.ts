import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {Barber} from "../../auth/model/barber.model";
import {BarberApiService} from "../api/barber-api.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class BarberService {

  private apiService = inject(BarberApiService);
  private _selectedBarber = signal<Barber | undefined>(undefined);
  private storageService = inject(LocalStorageService);
  barbers = signal<Barber[]>([]);

  findAll(){
    this.apiService.findAll().subscribe(value => {
      this.barbers.set(value);
    });
  }

  selectBarber(barber: Barber){
    this._selectedBarber.set(barber);
    this.storageService.setSavedState(barber, "selectedBarber");
  }

  get selectedBarber(): WritableSignal<Barber | undefined> {
    return this._selectedBarber;
  }

}
