import {UserSession} from "../model/user-session.model";

export interface AuthState {
  userSession: UserSession;
}

export const INIT_AUTH_STATE: AuthState = {
  userSession: {}
}
