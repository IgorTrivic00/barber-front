import {Routes} from "@angular/router";
import {MainPanelComponent} from "../shared/components/main-panel/main-panel.component";

import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {loginPageGuard} from "../guards/login-page.guard";
import {authGuard} from "../guards/auth.guard";
import {ReservationPageComponent} from "./pages/reservation-page/reservation-page.component";
import {BarbersPageComponent} from "./pages/barbers-page/barbers-page.component";
import {ServicesPageComponent} from "./pages/services-page/services-page.component";
import {BarberDashboardComponent} from "./pages/barber-dashboard-page/barber-dashboard.component";
import {barberGuard} from "../guards/barber.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {customerGuard} from "../guards/customer.guard";
import {
  AppointmentPageComponent
} from "./pages/appointment-page/appointment-page.component";
import {
  MyAppointmentsPageComponentComponent
} from "./pages/my-appointments-page-component/my-appointments-page-component.component";


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
        path: 'reservation',
        component: ReservationPageComponent,
        canActivate: [authGuard, customerGuard]
      },
      {
        path: 'appointment/:appointmentUuid',
        component: AppointmentPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-appointments',
        component: MyAppointmentsPageComponentComponent,
        canActivate: [authGuard]
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.routes').then(mod => mod.authRoutes),
        canActivate: [loginPageGuard]
      }
    ]
  }
];
