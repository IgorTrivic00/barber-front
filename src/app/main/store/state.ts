import {Barber} from "../model/barber.model";

export interface MainState {
  barbers: Barber[];
}

export const INIT_MAIN_STATE: MainState = {
  barbers: []
}
