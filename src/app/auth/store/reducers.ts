import {AuthState, INIT_AUTH_STATE} from "./state";
import {createReducer, on} from "@ngrx/store";
import {AuthActions, extendTokenExpirationDateSuccess, loginSuccess, logoutSuccess} from "./actions";
import {cloneDeep} from 'lodash';

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
);

export function authReducer(state: AuthState | undefined, action: AuthActions): AuthState {
  return _authReducer(state, action);
}
