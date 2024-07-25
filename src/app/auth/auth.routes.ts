import {Routes} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";

export const authRoutes: Routes = [
  {
    path: '',
    children: [
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
