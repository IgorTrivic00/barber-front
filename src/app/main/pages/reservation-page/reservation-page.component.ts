import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {filter, Subject, takeUntil} from "rxjs";
import {CalendarModule} from "primeng/calendar";
import {Service} from "../../model/service.model";
import {Barber} from "../../../auth/model/barber.model";
import {selectedBarber, selectedService, selectSlots} from "../../store/selectors";
import {clearSelectService, scheduleAppointment, searchSlots} from "../../store/actions";
import {SlotFilter} from "../../model/slot-filter.model";
import {DatePipe} from "@angular/common";
import {Slot} from "../../model/slot.model";
import {AppModule} from "../../../app.module";
import {cloneDeep} from "lodash";
import {SlotListComponent} from "../../components/slots/slot-list.component";
import {SlotState} from "../../model/enums/slot-state.enum";
import {Appointment} from "../../model/appointment.model";
import {v4 as uuidv4} from 'uuid';
import {AppointmentState} from "../../model/enums/appointment-state.enum";
import {AuthService} from "../../../auth/service/auth.service";
import {Customer} from "../../../auth/model/customer.model";
import {DialogService} from "primeng/dynamicdialog";
import {
  ConfirmAppointmentModalComponent
} from "../../modal/confirm-appointment-modal/confirm-appointment-modal.component";
import {NavBarService} from "../../../shared/service/nav-bar.service";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    CalendarModule,
    AppModule,
    SlotListComponent,
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
  loggedCustomer: Customer | undefined;
  slots: Slot[] | undefined;
  filter: SlotFilter | undefined;
  selectedTimeSlot: Slot | undefined;
  navBarService = inject(NavBarService);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private authService: AuthService,
              private router: Router,
              private dialogService: DialogService,
              private datePipe: DatePipe) {
    this.setCalendar();
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
    let date = cloneDeep($event);
    this.filter = {
      ...this.filter,
      from: this.datePipe.transform(date, 'yyyy-MM-dd')!,
      to: this.datePipe.transform(date.setDate(date.getDate() + 1), 'yyyy-MM-dd')!,
    }
    this.searchSlots();
  }

  private initDispatch() {
    this.navBarService.hide();
    this.searchSlots();
  }

  private initSelectors() {
    this.selectedService();
    this.selectedBarber();
    this.selectSlots();
    this.authService.getLoggedCustomer()?.subscribe(value => this.loggedCustomer = value);
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
      states: [SlotState.FREE, SlotState.CANCELED],
      barberUuids: [this.barber?.uuid!]
    }
  }

  scheduleAppointment() {
    const appointment: Appointment = {
      uuid: uuidv4(),
      barber: this.barber,
      appointmentState: AppointmentState.SCHEDULED,
      slot: this.selectedTimeSlot,
      service: this.service,
      customer: this.loggedCustomer
    };
    this.dialogService.open(ConfirmAppointmentModalComponent, {
      header: 'Zakažite termin',
      width: '85%',
      height: 'auto',
      contentStyle: {
        overflow: 'auto'
      },
      baseZIndex: 10000,
      data: {
        appointment
      }
    }).onClose.subscribe(response => {
      if (response){
        this.store$.dispatch(scheduleAppointment({appointment}));
      }
    })
  }

  selectSlot(slot: Slot){
    this.slots = this.slots?.map(slot1 => {
      slot1.uuid === slot.uuid ? slot1.selected = true : slot1.selected = false;
      return slot1;
    });
    this.selectedTimeSlot = slot;
  }

  private setCalendar() {
    this.from = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.to = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
  }

  return() {
    this.router.navigate(['services', this.barber?.uuid]);
  }
}
