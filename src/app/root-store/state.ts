import {CommonState, INIT_COMMON_STATE} from "../shared/store/state";
import {AuthState, INIT_AUTH_STATE} from "../auth/store/state";
import {INIT_MAIN_STATE, MainState} from "../main/store/state";

export interface AppState {
  common: CommonState;
  auth: AuthState;
  main: MainState;
}

export const INIT_APP_STATE: AppState = {
  common: INIT_COMMON_STATE,
  auth: INIT_AUTH_STATE,
  main: INIT_MAIN_STATE
};

export function getInitAppState(): AppState {
  return INIT_APP_STATE;
}
