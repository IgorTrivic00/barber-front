import {UserRole} from "./user-role.model";

export interface User {
  uuid: string;
  email: string;
  password?: string;
  userRole?: UserRole;
}
