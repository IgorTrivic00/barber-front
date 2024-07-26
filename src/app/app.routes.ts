import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {loginPageGuard} from "./guards/login-page.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.routes').then(mod => mod.mainRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(mod => mod.authRoutes),
    canActivate: [loginPageGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
