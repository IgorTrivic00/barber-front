import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {filter, Subject, takeUntil} from "rxjs";
import {CalendarModule} from "primeng/calendar";
import {hideNavBar, showNavBar} from "../../../shared/store/actions";
import {Service} from "../../model/service.model";
import {Barber} from "../../../auth/model/barber.model";
import {selectedBarber, selectedService, selectSlots} from "../../store/selectors";
import {clearSelectService, searchSlots} from "../../store/actions";
import {SlotFilter} from "../../model/slot-filter.model";
import {DatePipe} from "@angular/common";
import {Slot} from "../../model/slot.model";
import {AppModule} from "../../../app.module";
import {cloneDeep} from "lodash";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    CalendarModule,
    AppModule,
  ],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.scss',
  providers: [DatePipe]
})
export class ReservationPageComponent implements OnInit, OnDestroy{

  from: any;
  to: any;
  nowDate = new Date();
  service: Service | undefined;
  barber: Barber | undefined;
  slots: Slot[] | undefined;
  filter: SlotFilter | undefined;
  selectedTimeSlot: Slot | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private datePipe: DatePipe) {
    this.from = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.to = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
    this.initSelectors();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearSelectService());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.initFilter();
    this.initDispatch();
  }

  onCalendarChange($event: Date) {
    this.filter = {
      ...this.filter,
      from: this.datePipe.transform($event, 'yyyy-MM-dd')!,
      to: this.datePipe.transform($event.setDate($event.getDate() + 1), 'yyyy-MM-dd')!,
    }
    this.searchSlots();
  }

  private initDispatch() {
    this.store$.dispatch(hideNavBar());
    this.searchSlots();
  }

  private initSelectors() {
    this.selectedService();
    this.selectedBarber();
    this.selectSlots();
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

  private selectSlots() {
    this.store$.select(selectSlots)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.slots = cloneDeep(value));
  }

  searchSlots(){
    this.store$.dispatch(searchSlots({filter: this.filter!}));
  }

  private initFilter() {
    this.filter = {
      from: this.from,
      to: this.to,
      barberUuids: [this.barber?.uuid!]
    }
  }

  bookAppointment() {

  }

  selectSlot(slot: Slot){
    this.slots = this.slots?.map(slot1 => {
      slot1.uuid === slot.uuid ? slot1.selected = true : slot1.selected = false;
      return slot1;
    });
    this.selectedTimeSlot = slot;
  }
}
