import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.routes').then(mod => mod.mainRoutes),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
