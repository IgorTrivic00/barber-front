import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Barber} from "../../../auth/model/barber.model";
import {filter, Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {getBarbers, selectBarber} from "../../store/actions";
import {cloneDeep} from "lodash";
import {selectBarbers} from "../../store/selectors";
import {hideNavBar, showNavBar} from "../../../shared/store/actions";

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

  barbers: Barber[] | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router) {
    this.selectBarbers();
  }

  ngOnInit(): void {
    this.store$.dispatch(showNavBar());
    this.store$.dispatch(getBarbers());
  }

  private selectBarbers() {
    this.store$.select(selectBarbers)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.barbers = cloneDeep(value));
  }

  redirectToServices = (barber: Barber) => {
    this.store$.dispatch(hideNavBar());
    this.store$.dispatch(selectBarber({barber}));
    this.router.navigate(['services', barber.uuid]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
