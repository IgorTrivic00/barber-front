import {Component, inject, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Router} from "@angular/router";
import {NavBarService} from "../../../shared/service/nav-bar.service";

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

  navBarService = inject(NavBarService);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.navBarService.show();
  }

  onLogout() {
    this.navBarService.hide();
  }

  onUserProfile() {
    this.router.navigate(['user-profile']);
  }
}
