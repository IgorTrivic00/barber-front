import {User} from "./user.model";

export interface Customer {
  uuid?: string;
  id?: number;
  name?: string;
  mobile?: User;
}
