import {Component, inject, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Barber} from "../../../auth/model/barber.model";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {BarberService} from "../../services/barber.service";

@Component({
  selector: 'app-barbers',
  standalone: true,
  imports: [
    BarberListComponent
  ],
  templateUrl: './barbers-page.component.html',
  styleUrl: './barbers-page.component.scss'
})
export class BarbersPageComponent implements OnInit{

  private navBarService = inject(NavBarService);
  barberService = inject(BarberService);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.navBarService.show();
    this.barberService.findAll();
  }

  redirectToServices = (barber: Barber) => {
    this.navBarService.hide();
    this.barberService.selectBarber(barber);
    this.router.navigate(['services', barber.uuid]);
  }
}
