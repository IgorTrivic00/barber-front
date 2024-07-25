import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {loginPageGuard} from "./guards/login-page.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/components/main-panel/main-panel.component')
        .then(m => m.MainPanelComponent),
    canActivate: [authGuard],
  },
  {
    path: 'home/about',
    loadComponent: () =>
      import('./home/components/about/about.component')
        .then(m => m.AboutComponent),
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
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
