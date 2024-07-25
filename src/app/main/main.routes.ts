import {Routes} from "@angular/router";
import {MainPanelComponent} from "./components/main-panel/main-panel.component";
import {ServicesComponent} from "./components/services/services.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {HomeComponent} from "./components/home/home.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";


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
        component: ScheduleComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      }
    ],
  },
];
