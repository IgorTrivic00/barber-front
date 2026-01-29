import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {SearchResponse} from "../model/search-response.model";
import {ServiceFilter} from "../model/service-filter.model";
import {Slot} from "../model/slot.model";
import {Appointment} from "../model/appointment.model";

export interface MainState {
  slotSearchResponse: SearchResponse<Slot> | null;
  selectedBarber: Barber | null;
  selectedService: Service | null;
}

export const INIT_MAIN_STATE: MainState = {
  slotSearchResponse: null,
  selectedBarber: null,
  selectedService: null
}
