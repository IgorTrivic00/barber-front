import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {SearchResponse} from "../model/search-response.model";
import {ServiceFilter} from "../model/service-filter.model";

export interface MainState {
  barbers: Barber[] | null;
  lastServiceFilter: ServiceFilter | null;
  serviceSearchResponse: SearchResponse<Service> | null;
}

export const INIT_MAIN_STATE: MainState = {
  barbers: null,
  lastServiceFilter: null,
  serviceSearchResponse: null
}
