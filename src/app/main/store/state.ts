import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";

export interface MainState {
  barbers: Barber[] | null;
  barberServices: Service[] | null;
}

export const INIT_MAIN_STATE: MainState = {
  barbers: null,
  barberServices: null
}
