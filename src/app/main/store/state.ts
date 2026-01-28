import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {SearchResponse} from "../model/search-response.model";
import {ServiceFilter} from "../model/service-filter.model";
import {Slot} from "../model/slot.model";
import {Appointment} from "../model/appointment.model";

export interface MainState {
  lastServiceFilter: ServiceFilter | null;
  serviceSearchResponse: SearchResponse<Service> | null;
  slotSearchResponse: SearchResponse<Slot> | null;
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedAppointment: Appointment | null;
  appointmentSearchResponse: SearchResponse<Appointment> | null;
}

export const INIT_MAIN_STATE: MainState = {
  lastServiceFilter: null,
  serviceSearchResponse: null,
  slotSearchResponse: null,
  selectedBarber: null,
  selectedService: null,
  selectedAppointment: null,
  appointmentSearchResponse: null
}
