import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {SearchResponse} from "../model/search-response.model";
import {ServiceFilter} from "../model/service-filter.model";
import {Slot} from "../model/slot.model";
import {Appointment} from "../model/appointment.model";

export interface MainState {
  barbers: Barber[] | null;
  lastServiceFilter: ServiceFilter | null;
  serviceSearchResponse: SearchResponse<Service> | null;
  slotSearchResponse: SearchResponse<Slot> | null;
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedAppointment: Appointment | null;
}

export const INIT_MAIN_STATE: MainState = {
  barbers: null,
  lastServiceFilter: null,
  serviceSearchResponse: null,
  slotSearchResponse: null,
  selectedBarber: null,
  selectedService: null,
  selectedAppointment: null
}
