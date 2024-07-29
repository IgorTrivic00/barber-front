import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";

export interface MainState {
  barbers: Barber[];
  barberServices: Service[];
}

export const INIT_MAIN_STATE: MainState = {
  barbers: [],
  barberServices: []
}
