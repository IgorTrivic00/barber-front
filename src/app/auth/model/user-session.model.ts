import {User} from "./user.model";

export interface UserSession {
  user?: User;
  token?: string;
}
