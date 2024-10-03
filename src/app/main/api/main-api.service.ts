import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Barber} from "../../auth/model/barber.model";
import {enviroment} from "../../enviroments/enviroment";
import {Service} from "../model/service.model";
import {Customer} from "../../auth/model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  private readonly BARBER_API = enviroment.baseUrl + '/api/v1/barber';
  private readonly SERVICE_API = enviroment.baseUrl + '/api/v1/service';
  private readonly CUSTOMER_API = enviroment.baseUrl + '/api/v1/customer';

  constructor(private httpClient: HttpClient) {
  }

  getBarbers() {
    return this.httpClient.get<Barber[]>(this.BARBER_API + '/find-all');
  }

  getBarberServices(barberUuid: string) {
    return this.httpClient.get<Service[]>(this.SERVICE_API + '/barber/' + barberUuid);
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(this.CUSTOMER_API + '/update', customer);
  }

  addService(service: Service){
    return this.httpClient.post<Service>(this.SERVICE_API + '/add', service);
  }

  deleteService(serviceUuid: string) {
    return this.httpClient.delete(this.SERVICE_API + '/' + serviceUuid);
  }
}
