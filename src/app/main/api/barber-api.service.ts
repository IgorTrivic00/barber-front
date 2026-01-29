import {inject, Injectable} from "@angular/core";
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Barber} from "../../auth/model/barber.model";

@Injectable({
  providedIn: 'root'
})
export class BarberApiService {

  private readonly BARBER_API = enviroment.baseUrl + '/api/v1/barber';

  private httpClient = inject(HttpClient);

  findAll() {
    return this.httpClient.get<Barber[]>(this.BARBER_API + '/find-all');
  }

}
