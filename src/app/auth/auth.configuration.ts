import {Injectable} from "@angular/core";
import {enviroment} from "../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class AuthConfiguration{
  authApi =  enviroment.baseUrl + '/api/v1/auth/';
  excludedEndPoints = [
    enviroment.baseUrl + '/api/v1/auth/keep-alive',
    enviroment.baseUrl + '/api/v1/auth/logout',
    enviroment.baseUrl + '/api/v1/barber/find-all',
    enviroment.baseUrl + '/api/v1/service/barber/**'
  ]
}
