import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, takeUntil} from "rxjs";
import {Appointment} from "../../model/appointment.model";
import {Store} from "@ngrx/store";
import {selectAppointments} from "../../store/selectors";
import {AppointmentFilter} from "../../model/appointment-filter.model";
import {AppointmentState} from "../../model/enums/appointment-state.enum";
import {clearAppointmentSearch} from "../../store/actions";
import {Button} from "primeng/button";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {AppointmentListComponent} from "../../components/appointment/appointment-list.component";
import {MainService} from "../../services/main.service";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-my-appointments-page-component',
  standalone: true,
  templateUrl: './my-appointments-page-component.component.html',
  imports: [
    Button,
    ServiceListComponent,
    AppointmentListComponent
  ],
  styleUrls: ['./my-appointments-page-component.component.scss']
})
export class MyAppointmentsPageComponentComponent implements OnInit, OnDestroy {

  appointments!: Appointment[];
  filter!: AppointmentFilter;
  selectedState: AppointmentState[] = [AppointmentState.SCHEDULED];
  navBarService = inject(NavBarService);
  appointmentService = inject(AppointmentService);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private mainService: MainService) {
    this.initSelectors();
  }

  ngOnInit(): void {
    this.initFilter();
    this.navBarService.show();
    this.findMineAppointments();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearAppointmentSearch());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initSelectors() {
    this.selectAppointments();
  }

  private selectAppointments() {
    this.store$.select(selectAppointments)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.appointments = value);
  }

  private initFilter() {
    this.filter = {
      states: [AppointmentState.SCHEDULED]
    };
  }

  protected readonly AppointmentState = AppointmentState;

  filterAppointments(states: AppointmentState[]) {
    this.selectedState = states;
    this.filter = {
      ...this.filter,
      states: states
    }
    this.findMineAppointments();
  }

  findMineAppointments = ()=> {
    this.appointmentService.findMine(this.filter);
  }

  cancelAppointment(appointment: Appointment) {
    this.mainService.cancelAppointment(appointment, this.findMineAppointments);
  }

  completeAppointment(appointment: Appointment) {
    this.mainService.completeAppointment(appointment, this.findMineAppointments);
  }
}
