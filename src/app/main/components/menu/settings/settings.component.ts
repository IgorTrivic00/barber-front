import { Component } from '@angular/core';
import {BarberListComponent} from "../services/barber-list/barber-list.component";
import {Store} from "@ngrx/store";
import {logout} from "../../../../auth/store/actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
    imports: [
        BarberListComponent
    ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

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
