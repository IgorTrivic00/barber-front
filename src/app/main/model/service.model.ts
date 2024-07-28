import {Barber} from "./barber.model";

export interface Service {
  id?: number;
  uuid?: string;
  serviceName?: string;
  duration?: number;
  price?: number;
  barber?: Barber;
}
