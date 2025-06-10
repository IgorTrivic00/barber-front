import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Barber} from "../../auth/model/barber.model";
import {enviroment} from "../../enviroments/enviroment";
import {Service} from "../model/service.model";
import {Customer} from "../../auth/model/customer.model";
import {ServiceFilter} from "../model/service-filter.model";
import {SearchResponse} from "../model/search-response.model";
import {SlotFilter} from "../model/slot-filter.model";
import {Slot} from "../model/slot.model";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  private readonly BARBER_API = enviroment.baseUrl + '/api/v1/barber';
  private readonly SERVICE_API = enviroment.baseUrl + '/api/v1/service';
  private readonly SLOT_API = enviroment.baseUrl + '/api/v1/slot';
  private readonly CUSTOMER_API = enviroment.baseUrl + '/api/v1/customer';

  constructor(private httpClient: HttpClient) {
  }

  getBarbers() {
    return this.httpClient.get<Barber[]>(this.BARBER_API + '/find-all');
  }

  searchServices(filter: ServiceFilter) {
    return this.httpClient.post<SearchResponse<Service>>(this.SERVICE_API + '/search', filter);
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(this.CUSTOMER_API + '/update', customer);
  }

  addService(service: Service){
    return this.httpClient.post<Service>(this.SERVICE_API + '/add', service);
  }

  deleteService(uuid: string | undefined) {
    return this.httpClient.delete<Service>(this.SERVICE_API + '/' + uuid);
  }

  updateService(service: Service) {
    return this.httpClient.put<Service>(this.SERVICE_API , service);
  }

  findMyServices() {
    return this.httpClient.get<SearchResponse<Service>>(this.SERVICE_API + '/my-services');
  }

  searchSlots(filter: SlotFilter) {
    return this.httpClient.post<SearchResponse<Slot>>(this.SLOT_API + '/search', filter);
  }
}
