import {AppointmentState} from "./enums/appointment-state.enum";

export interface AppointmentFilter {
  uuidsIn?: string[];
  customerUuids?: string[];
  states?: AppointmentState[];
}
