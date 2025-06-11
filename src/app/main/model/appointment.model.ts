import {Slot} from "./slot.model";
import {Barber} from "../../auth/model/barber.model";
import {AppointmentState} from "./enums/appointment-state.enum";
import {Service} from "./service.model";

export interface Appointment {
  uuid: string;
  customerUuid?: string;
  slot?: Slot;
  barber?: Barber;
  service?: Service;
  appointmentState: AppointmentState;
}
