import { Component } from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Store} from "@ngrx/store";
import {logout} from "../../../auth/store/actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings-page',
  standalone: true,
    imports: [
        BarberListComponent
    ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  constructor(private store$: Store,
              private router: Router) {
  }

  onLogout() {
    this.store$.dispatch(logout());
  }

  onUserProfile() {
    this.router.navigate(['user-profile'])
  }
}
