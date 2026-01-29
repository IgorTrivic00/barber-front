import {Component, inject, OnInit} from '@angular/core';
import {Appointment} from "../../model/appointment.model";
import {AppointmentFilter} from "../../model/appointment-filter.model";
import {AppointmentState} from "../../model/enums/appointment-state.enum";
import {Button} from "primeng/button";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {AppointmentListComponent} from "../../components/appointment/appointment-list.component";
import {MainService} from "../../services/main.service";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {AppointmentService} from "../../services/appointment.service";
import {MINE_APPOINTMENT_SEARCH_ID} from "../../constants/constants";

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
export class MyAppointmentsPageComponentComponent implements OnInit {

  filter!: AppointmentFilter;
  selectedState: AppointmentState[] = [AppointmentState.SCHEDULED];
  navBarService = inject(NavBarService);
  appointmentService = inject(AppointmentService);

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.initFilter();
    this.navBarService.show();
    this.findMineAppointments();
  }

  private initFilter() {
    this.filter = {
      states: [AppointmentState.SCHEDULED]
    };
  }

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

  protected readonly MINE_APPOINTMENT_SEARCH_ID = MINE_APPOINTMENT_SEARCH_ID;
  protected readonly AppointmentState = AppointmentState;
}
