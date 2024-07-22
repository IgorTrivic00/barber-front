export enum AuthActionsConstants {
  Login = '[AuthActions] Login',
  LoginSuccess = '[AuthActions] Login Success',
  RedirectAfterLogin = '[AuthActions] Redirect After Login',

  Register = '[AuthActions] Register',
  RegisterSuccess = '[AuthActions] Register Success',

  ExtendTokenExpirationDate = '[AuthActions] Extend Token Expiration Date',
  ExtendTokenExpirationDateSuccess = '[AuthActions] Extend Token Expiration Date Success',

  Logout = '[AuthActions] Logout',
  LogoutSuccess = '[AuthActions] Logout Success',

  RedirectToLoginPage = '[AuthActions] Redirect To Login Page',
}
