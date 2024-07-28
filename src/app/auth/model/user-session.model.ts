import {User} from "./user.model";
import {Barber} from "../../main/model/barber.model";
import {Customer} from "../../main/model/customer.model";

export interface UserSession {
  user?: User;
  token?: string;
  barber?: Barber;
  customer?: Customer;
}
