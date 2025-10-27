import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, takeUntil} from "rxjs";
import {Appointment} from "../../model/appointment.model";
import {Store} from "@ngrx/store";
import {selectAppointments} from "../../store/selectors";
import {AppointmentFilter} from "../../model/appointment-filter.model";
import {AppointmentState} from "../../model/enums/appointment-state.enum";
import {cancelAppointment, clearAppointmentSearch, completeAppointment, findMyAppointments} from "../../store/actions";
import {showNavBar} from "../../../shared/store/actions";
import {Button} from "primeng/button";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {AppointmentListComponent} from "../../components/appointment/appointment-list.component";
import {ConfirmationService} from "primeng/api";
import {MainService} from "../../services/main.service";

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

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private mainService: MainService) {
    this.initSelectors();
  }

  ngOnInit(): void {
    this.initFilter();
    this.initDispatch();
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

  private initDispatch() {
    this.store$.dispatch(showNavBar());
    this.searchAppointments();
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
    this.searchAppointments();
  }

  searchAppointments = ()=> {
    this.store$.dispatch(findMyAppointments({filter: this.filter}));
  }

  cancelAppointment(appointment: Appointment) {
    this.mainService.cancelAppointment(appointment, this.searchAppointments);
  }

  completeAppointment(appointment: Appointment) {
    this.mainService.completeAppointment(appointment, this.searchAppointments);
  }
}
