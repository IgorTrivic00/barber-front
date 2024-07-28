import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Barber} from "../model/barber.model";
import {enviroment} from "../../enviroments/enviroment";
import {Service} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  private readonly BARBER_API = enviroment.baseUrl + '/api/v1/barber';
  private readonly SERVICE_API = enviroment.baseUrl + '/api/v1/service';

  constructor(private httpClient: HttpClient) {
  }

  getBarbers() {
    return this.httpClient.get<Barber[]>(this.BARBER_API + '/find-all');
  }

  getBarberServices(barberUuid: string) {
    return this.httpClient.get<Service[]>(this.SERVICE_API + '/barber/' + barberUuid);
  }
}
