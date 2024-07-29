import {User} from "./user.model";
import {Barber} from "./barber.model";
import {Customer} from "./customer.model";

export interface UserSession {
  user?: User;
  token?: string;
  barber?: Barber;
  customer?: Customer;
}
