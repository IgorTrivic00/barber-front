import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Barber} from "../../../auth/model/barber.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {selectBarber} from "../../store/actions";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {BarbersService} from "../../services/barbers.service";

@Component({
  selector: 'app-barbers',
  standalone: true,
  imports: [
    BarberListComponent
  ],
  templateUrl: './barbers-page.component.html',
  styleUrl: './barbers-page.component.scss'
})
export class BarbersPageComponent implements OnInit, OnDestroy{

  private navBarService = inject(NavBarService);
  barberService = inject(BarbersService);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router) {
  }

  ngOnInit(): void {
    this.navBarService.show();
    this.barberService.findAll();
  }

  redirectToServices = (barber: Barber) => {
    this.navBarService.hide();
    this.store$.dispatch(selectBarber({barber}));
    this.router.navigate(['services', barber.uuid]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
