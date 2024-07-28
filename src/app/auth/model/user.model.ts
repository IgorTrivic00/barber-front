import {UserRole} from "./user-role.model";

export interface User {
  email: string;
  password?: string;
  userRole?: UserRole;
}
