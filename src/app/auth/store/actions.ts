import {createAction, props, union} from "@ngrx/store";
import {AuthActionsConstants} from "../constants/constants";
import {User} from "../model/user.model";
import {KeepAliveRequest} from "../model/request_response/keep-alive.request";
import {KeepAliveResponse} from "../model/request_response/keep-alive.response";
import {UserSession} from "../model/user-session.model";
import {Customer} from "../model/customer.model";
import {AuthenticationRequest} from "../model/request_response/authentication-request.model";

export const login = createAction(AuthActionsConstants.Login,
  props< {user: User}>());

export const loginSuccess = createAction(AuthActionsConstants.LoginSuccess,
  props< {user: UserSession}>());

export const registerCustomer = createAction(AuthActionsConstants.Register,
  props< {request: AuthenticationRequest}>());

export const registerCustomerSuccess = createAction(AuthActionsConstants.RegisterSuccess,
  props< {customer: Customer}>());

export const extendTokenExpirationDate = createAction(AuthActionsConstants.ExtendTokenExpirationDate,
  props<{keepAliveRequest: KeepAliveRequest}>());

export const extendTokenExpirationDateSuccess = createAction(AuthActionsConstants.ExtendTokenExpirationDateSuccess,
  props<{keepAliveResponse: KeepAliveResponse}>());

export const logout = createAction(AuthActionsConstants.Logout);

export const logoutSuccess = createAction(AuthActionsConstants.LogoutSuccess);

export const redirectAfterLogin = createAction(AuthActionsConstants.RedirectAfterLogin,
  props<{redirectUrl: string}>());

export const redirectToLoginPage = createAction(AuthActionsConstants.RedirectToLoginPage);

const all = union({
  login,
  loginSuccess,
  registerCustomer,
  registerCustomerSuccess,
  extendTokenExpirationDate,
  extendTokenExpirationDateSuccess,
  logout,
  logoutSuccess,
  redirectAfterLogin,
  redirectToLoginPage
});

export type AuthActions = typeof all;
