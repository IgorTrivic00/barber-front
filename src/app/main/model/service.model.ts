import {Barber} from "../../auth/model/barber.model";

export interface Service {
  uuid?: string;
  serviceName?: string;
  duration?: number;
  price?: number;
  barber?: Barber;
}
