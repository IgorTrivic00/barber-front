import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Barber} from "../model/barber.model";
import {enviroment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  private readonly BARBER_API = enviroment.baseUrl + '/api/v1/barber';

  constructor(private httpClient: HttpClient) {
  }

  getBarbers() {
    return this.httpClient.get<Barber[]>(this.BARBER_API + '/find-all');
  }
}
