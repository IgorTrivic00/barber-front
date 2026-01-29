import {inject, Injectable, signal} from "@angular/core";
import {Barber} from "../../auth/model/barber.model";
import {BarberApiService} from "../api/barber-api.service";

@Injectable({
  providedIn: "root"
})
export class BarbersService {

  private apiService = inject(BarberApiService);
  barbers = signal<Barber[]>([]);


  findAll(){
    this.apiService.findAll().subscribe(value => {
      this.barbers.set(value);
    });
  }

  selectBarber(barber: Barber){

  }

}
