import {BarberTitle} from "./barber-title.model";
import {User} from "./user.model";

export interface Barber {
  uuid?: string;
  id?: number;
  name?: string;
  barberTitle?: BarberTitle;
  user?: User;
}
