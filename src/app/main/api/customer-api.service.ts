import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../enviroments/enviroment";
import {Customer} from "../../auth/model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private readonly CUSTOMER_API = enviroment.baseUrl + '/api/v1/customer';

  private httpClient = inject(HttpClient);

  update(customer: Customer) {
    return this.httpClient.post<Customer>(this.CUSTOMER_API + '/update', customer);
  }

}
