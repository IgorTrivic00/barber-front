import {Routes} from "@angular/router";
import {MainPanelComponent} from "./components/main/main-panel/main-panel.component";

import {ScheduleComponent} from "./components/menu/schedule/schedule.component";
import {HomeComponent} from "./components/menu/home/home.component";
import {SettingsComponent} from "./components/menu/settings/settings.component";
import {loginPageGuard} from "../guards/login-page.guard";
import {authGuard} from "../guards/auth.guard";
import {ServicesComponent} from "./components/menu/services/services/services.component";
import {UserProfileComponent} from "./components/menu/settings/user-profile/user-profile.component";
import { barberGuard } from "../guards/barber.guard";
import { ServicesBarbersComponent } from "./components/menu/services/services-barbers.component";
import { ServicesBarberComponent } from "./components/menu/services/services/services-barber/services-barber.component";
import { ServiceItemComponent } from "./components/menu/services/services/service-list/service-item/service-item.component";
import {ReservationComponent} from "./components/menu/reservation/reservation.component";


export const mainRoutes: Routes = [
  {
    path: '',
    component: MainPanelComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'services-barbers',
        component: ServicesBarbersComponent
      },
      {
        path: 'services/:barberUuid',
        component: ServicesComponent
      },
      {
        path: 'my-services/:barberUuid',
        component:  ServicesBarberComponent,
        canActivate: [barberGuard]
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [authGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [authGuard]
      },
      {
        path: 'reservation',
        component: ReservationComponent,
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
