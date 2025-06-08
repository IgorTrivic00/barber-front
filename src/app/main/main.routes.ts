import {Routes} from "@angular/router";
import {MainPanelComponent} from "../shared/components/main-panel/main-panel.component";

import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {loginPageGuard} from "../guards/login-page.guard";
import {authGuard} from "../guards/auth.guard";
import {AppointmentPageComponent} from "./pages/appointment-page/appointment-page.component";
import {BarbersPageComponent} from "./pages/barbers-page/barbers-page.component";
import {ServicesPageComponent} from "./pages/services-page/services-page.component";
import {BarberDashboardComponent} from "./pages/barber-dashboard-page/barber-dashboard.component";
import {barberGuard} from "../guards/barber.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {customerGuard} from "../guards/customer.guard";


export const mainRoutes: Routes = [
  {
    path: '',
    component: MainPanelComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'barbers',
        component: BarbersPageComponent
      },
      {
        path: 'services/:barberUuid',
        component: ServicesPageComponent
      },
      {
        path: 'my-services',
        component: BarberDashboardComponent,
        canActivate: [authGuard, barberGuard]
      },
      {
        path: 'schedule',
        component: SchedulePageComponent,
        canActivate: [authGuard, customerGuard]
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [authGuard]
      },
      {
        path: 'appointment',
        component: AppointmentPageComponent,
        canActivate: [authGuard, customerGuard]
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.routes').then(mod => mod.authRoutes),
        canActivate: [loginPageGuard]
      }
    ]
  }
];
