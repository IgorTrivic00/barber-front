import {inject, Injectable, signal} from "@angular/core";
import {MainApiService} from "../api/main-api.service";
import {Barber} from "../../auth/model/barber.model";

@Injectable({
  providedIn: "root"
})
export class BarbersService {

  private apiService = inject(MainApiService);
  barbers = signal<Barber[]>([]);

  findAll(){
    this.apiService.getBarbers().subscribe(value => {
      this.barbers.set(value);
    });
  }

}
