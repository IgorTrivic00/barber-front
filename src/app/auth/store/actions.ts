import {createAction, props, union} from "@ngrx/store";
import {AuthActionsConstants} from "../constants/constants";
import {User} from "../model/user.model";
import {KeepAliveRequest} from "../model/request_response/keep-alive.request";
import {KeepAliveResponse} from "../model/request_response/keep-alive.response";
import {UserSession} from "../model/user-session.model";

export const login = createAction(AuthActionsConstants.Login,
  props< {user: User}>());

export const loginSuccess = createAction(AuthActionsConstants.LoginSuccess,
  props< {user: UserSession}>());

export const register = createAction(AuthActionsConstants.Register,
  props< {user: User}>());

export const registerSuccess = createAction(AuthActionsConstants.RegisterSuccess,
  props< {user: User}>());

export const extendTokenExpirationDate = createAction(AuthActionsConstants.ExtendTokenExpirationDate,
  props<{keepAliveRequest: KeepAliveRequest}>());

export const extendTokenExpirationDateSuccess = createAction(AuthActionsConstants.ExtendTokenExpirationDateSuccess,
  props<{keepAliveResponse: KeepAliveResponse}>());

export const logout = createAction(AuthActionsConstants.Logout);

export const logoutSuccess = createAction(AuthActionsConstants.LogoutSuccess);

export const redirectAfterLogin = createAction(AuthActionsConstants.RedirectAfterLogin,
  props<{redirectUrl: string[]}>());

export const redirectToLoginPage = createAction(AuthActionsConstants.RedirectToLoginPage);

const all = union({
  login,
  loginSuccess,
  register,
  registerSuccess,
  extendTokenExpirationDate,
  extendTokenExpirationDateSuccess,
  logout,
  logoutSuccess,
  redirectAfterLogin,
  redirectToLoginPage
});

export type AuthActions = typeof all;
