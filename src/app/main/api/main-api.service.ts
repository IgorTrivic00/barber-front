import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Barber} from "../../auth/model/barber.model";
import {enviroment} from "../../enviroments/enviroment";
import {Service} from "../model/service.model";
import {Customer} from "../../auth/model/customer.model";
import {ServiceFilter} from "../model/service-filter.model";
import {SearchResponse} from "../model/search-response.model";
import {SlotFilter} from "../model/slot-filter.model";
import {Slot} from "../model/slot.model";
import {Appointment} from "../model/appointment.model";
import {AppointmentFilter} from "../model/appointment-filter.model";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  private readonly SLOT_API = enviroment.baseUrl + '/api/v1/slot';

  constructor(private httpClient: HttpClient) {
  }

  searchSlots(filter: SlotFilter) {
    return this.httpClient.post<SearchResponse<Slot>>(this.SLOT_API + '/search', filter);
  }
}
