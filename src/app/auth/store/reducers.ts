import {AuthState, INIT_AUTH_STATE} from "./state";
import {createReducer, on} from "@ngrx/store";
import {AuthActions, extendTokenExpirationDateSuccess, loginSuccess, logoutSuccess} from "./actions";
import {cloneDeep} from 'lodash';
import {updateCustomerSuccess} from "../../main/store/actions";

export const _authReducer = createReducer(INIT_AUTH_STATE,
  on(loginSuccess, (state, {user}) => ({
    ...state,
    userSession: user,
  })),
  on(extendTokenExpirationDateSuccess, (state, {keepAliveResponse}) => ({
    ...state,
    userSession: {
      ...state.userSession,
      token: keepAliveResponse.newToken
    }
  })),
  on(logoutSuccess, state => {
    return cloneDeep(INIT_AUTH_STATE);
  }),
  on(updateCustomerSuccess, (state, {customer}) => ({
    ...state,
    userSession: {
      ...state.userSession,
      customer
    },
  })),
);

export function authReducer(state: AuthState | undefined, action: AuthActions): AuthState {
  return _authReducer(state, action);
}
