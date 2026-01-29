import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {DataService} from "../../services/data.service";
import {AppointmentState} from "../../model/enums/appointment-state.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {Button} from "primeng/button";
import {User} from "../../../auth/model/user.model";
import {AuthService} from "../../../auth/service/auth.service";
import {MainService} from "../../services/main.service";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppointmentPageComponent implements OnInit {

  appointmentUuid!: string;
  loggedUser!: User;
  dateTimeFormat = 'HH:mm';
  navBarService = inject(NavBarService);
  appointmentService = inject(AppointmentService);
  selectedAppointment = this.appointmentService.selectedAppointment;

  constructor(private router: Router,
              private mainService: MainService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private dataService: DataService) {
    this.initSelectors();
  }

  ngOnInit(): void {
    this.navBarService.hide();
    this.appointmentService.findByUuid(this.appointmentUuid);
  }

  private initSelectors(): void {
    this.authService.getLoggedUser()?.subscribe(value => this.loggedUser = value);
    this.appointmentUuid = this.route.snapshot.params['appointmentUuid'];
  }

  getStatusColor(state: AppointmentState): string {
    return this.dataService.getAppointmentStateColor(state);
  }

  getStatusIcon(state: AppointmentState): string {
    return this.dataService.getAppointmentStatusIcon(state);
  }

  onCancel(): void {
    this.mainService.cancelAppointment(this.selectedAppointment(), this.return);
  }

  translateAppointmentState(appointmentState: AppointmentState) {
    return this.dataService.translateAppointmentState(appointmentState);
  }

  getDuration(duration: number | undefined) {
    return this.dataService.getDuration(duration);
  }

  protected readonly AppointmentState = AppointmentState;

  return = () => {
    this.router.navigate(['my-appointments']);
  }
}
