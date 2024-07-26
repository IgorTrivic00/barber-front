import {Routes} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {LoginOptionsComponent} from "./components/login-options/login-options.component";

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login-options',
        component: LoginOptionsComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      }
    ],
  },
];
