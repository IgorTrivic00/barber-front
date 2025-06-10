import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {filter, Subject, takeUntil} from "rxjs";
import {CalendarModule} from "primeng/calendar";
import {hideNavBar, showNavBar} from "../../../shared/store/actions";
import {Service} from "../../model/service.model";
import {Barber} from "../../../auth/model/barber.model";
import {selectedBarber, selectedService} from "../../store/selectors";
import {clearSelectService, searchSlots} from "../../store/actions";
import {SlotFilter} from "../../model/slot-filter.model";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    CalendarModule,
  ],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.scss'
})
export class ReservationPageComponent implements OnInit, OnDestroy{

  lastUrl: string | undefined;
  minDate: Date;
  service: Service | undefined;
  barber: Barber | undefined;
  filter: SlotFilter | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store) {
    this.minDate = new Date();
    this.initFilter();
    this.initSelectors();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearSelectService());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.initDispatch();
  }

  onCalendarChange($event: Date) {
    
  }

  private initDispatch() {
    this.store$.dispatch(hideNavBar());
    this.searchSlots();
  }

  private initSelectors() {
    this.selectedService();
    this.selectedBarber();
  }

  private selectedService() {
    this.store$.select(selectedService)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.service = value);
  }

  private selectedBarber() {
    this.store$.select(selectedBarber)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.barber = value);
  }

  searchSlots(){
    this.store$.dispatch(searchSlots({filter: this.filter!}));
  }

  private initFilter() {
    this.filter = {
      from: this.minDate
    }
  }
}
