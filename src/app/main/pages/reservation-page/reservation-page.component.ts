import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {CalendarModule} from "primeng/calendar";
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
import {AppointmentService} from "../../services/appointment.service";
import {SlotService} from "../../services/slot.service";
import {BarberService} from "../../services/barber.service";
import {ServiceService} from "../../services/service.service";

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
export class ReservationPageComponent implements OnInit{

  from: any;
  to: any;
  nowDate = new Date();
  loggedCustomer: Customer | undefined;
  filter: SlotFilter | undefined;
  selectedTimeSlot: Slot | undefined;
  private id = 'reservation-page';
  private navBarService = inject(NavBarService);
  private appointmentService = inject(AppointmentService);
  private slotService= inject(SlotService);
  private barberService = inject(BarberService);
  private serviceService = inject(ServiceService);
  slots = this.slotService.getResponse(this.id)?.data;
  barber = this.barberService.selectedBarber;
  service = this.serviceService.selectedService;

  constructor(private store$: Store,
              private authService: AuthService,
              private router: Router,
              private dialogService: DialogService,
              private datePipe: DatePipe) {
    this.setCalendar();
    this.initSelectors();
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
    this.authService.getLoggedCustomer()?.subscribe(value => this.loggedCustomer = value);
  }

  searchSlots(){
    this.slotService.search(this.id, this.filter);
  }

  private initFilter() {
    this.filter = {
      from: this.from,
      to: this.to,
      states: [SlotState.FREE, SlotState.CANCELED],
      barberUuids: [this.barber()?.uuid!]
    }
  }

  scheduleAppointment() {
    const appointment: Appointment = {
      uuid: uuidv4(),
      barber: this.barber(),
      appointmentState: AppointmentState.SCHEDULED,
      slot: this.selectedTimeSlot,
      service: this.service(),
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
        this.appointmentService.schedule(appointment);
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
    this.router.navigate(['services', this.barber()?.uuid]);
  }
}
