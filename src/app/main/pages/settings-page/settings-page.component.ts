import {Component, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Store} from "@ngrx/store";
import {logout} from "../../../auth/store/actions";
import {Router} from "@angular/router";
import {hideNavBar, showNavBar} from "../../../shared/store/actions";

@Component({
  selector: 'app-settings-page',
  standalone: true,
    imports: [
        BarberListComponent
    ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit{

  constructor(private store$: Store,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store$.dispatch(showNavBar());
  }

  onLogout() {
    this.store$.dispatch(logout());
  }

  onUserProfile() {
    this.router.navigate(['user-profile']);
  }
}
