import {Routes} from "@angular/router";
import {MainPanelComponent} from "./components/main/main-panel/main-panel.component";
import {ServicesComponent} from "./components/menu/services/services.component";
import {ScheduleComponent} from "./components/menu/schedule/schedule.component";
import {HomeComponent} from "./components/menu/home/home.component";
import {SettingsComponent} from "./components/menu/settings/settings.component";
import {NotificationsComponent} from "./components/menu/notifications/notifications.component";
import {loginPageGuard} from "../guards/login-page.guard";
import {authGuard} from "../guards/auth.guard";


export const mainRoutes: Routes = [
  {
    path: '',
    component: MainPanelComponent,
    children: [
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [authGuard]
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.routes').then(mod => mod.authRoutes),
        canActivate: [loginPageGuard]
      },
    ],
  },
];
