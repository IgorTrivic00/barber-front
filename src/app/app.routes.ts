import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {loginPageGuard} from "./guards/login-page.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/components/main-panel/main-panel.component')
        .then(m => m.MainPanelComponent),
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/components/login-page/login-page.component')
        .then(m => m.LoginPageComponent),
    canActivate: [loginPageGuard]
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/components/register-page/register-page.component')
        .then(m => m.RegisterPageComponent),
    canActivate: [loginPageGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
