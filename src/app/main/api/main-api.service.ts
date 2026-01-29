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
  private readonly CUSTOMER_API = enviroment.baseUrl + '/api/v1/customer';
  private readonly APPOINTMENT_API = enviroment.baseUrl + '/api/v1/appointment';

  constructor(private httpClient: HttpClient) {
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(this.CUSTOMER_API + '/update', customer);
  }

  searchSlots(filter: SlotFilter) {
    return this.httpClient.post<SearchResponse<Slot>>(this.SLOT_API + '/search', filter);
  }

  scheduleAppointment(appointment: Appointment) {
    return this.httpClient.post<Appointment>(this.APPOINTMENT_API + '/schedule', appointment);
  }

  findAppointmentByUuid(appointmentUuid: string) {
    return this.httpClient.get<Appointment>(this.APPOINTMENT_API + '/uuid/' + appointmentUuid);
  }

  findMyAppointments(filter: AppointmentFilter) {
    return this.httpClient.post<SearchResponse<Appointment>>(this.APPOINTMENT_API + '/my-appointments', filter);
  }

  cancelAppointment(appointment: Appointment) {
    return this.httpClient.post<Appointment>(this.APPOINTMENT_API + '/cancel', appointment);
  }

  completeAppointment(appointment: Appointment) {
    return this.httpClient.post<Appointment>(this.APPOINTMENT_API + '/complete', appointment);
  }
}
