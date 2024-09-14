import {User} from "../user.model";
import {Customer} from "../customer.model";
import {Barber} from "../barber.model";

export interface AuthenticationRequest {
  user: User;
  customer?: Customer;
  barber?: Barber;
}
