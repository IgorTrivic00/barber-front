import {BarberTitle} from "./barber-title.model";

export interface Barber {
  uuid?: string;
  id?: number;
  name?: string;
  title?: BarberTitle;
}
