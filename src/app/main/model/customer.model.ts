import {User} from "../../auth/model/user.model";

export interface Customer {
  uuid?: string;
  id?: number;
  name?: string;
  user?: User;
}
