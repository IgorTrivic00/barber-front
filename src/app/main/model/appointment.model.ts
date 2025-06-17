import {Slot} from "./slot.model";
import {Barber} from "../../auth/model/barber.model";
import {AppointmentState} from "./enums/appointment-state.enum";
import {Service} from "./service.model";
import {Customer} from "../../auth/model/customer.model";

export interface Appointment {
  uuid: string;
  customer?: Customer;
  slot?: Slot;
  barber?: Barber;
  service?: Service;
  appointmentState: AppointmentState;
}
