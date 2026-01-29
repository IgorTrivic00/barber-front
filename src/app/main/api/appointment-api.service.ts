import {inject, Injectable} from "@angular/core";
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../model/appointment.model";
import {AppointmentFilter} from "../model/appointment-filter.model";
import {SearchResponse} from "../model/search-response.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {

  private readonly APPOINTMENT_API = enviroment.baseUrl + '/api/v1/appointment';

  private httpClient = inject(HttpClient);

  schedule(appointment: Appointment) {
    return this.httpClient.post<Appointment>(this.APPOINTMENT_API + '/schedule', appointment);
  }

  findByUuid(uuid: string) {
    return this.httpClient.get<Appointment>(this.APPOINTMENT_API + '/uuid/' + uuid);
  }

  findMine(filter: AppointmentFilter) {
    return this.httpClient.post<SearchResponse<Appointment>>(this.APPOINTMENT_API + '/my-appointments', filter);
  }

    cancel(appointment: Appointment | undefined) {
    return this.httpClient.post<Appointment>(this.APPOINTMENT_API + '/cancel', appointment);
  }

  complete(appointment: Appointment) {
    return this.httpClient.post<Appointment>(this.APPOINTMENT_API + '/complete', appointment);
  }

}
