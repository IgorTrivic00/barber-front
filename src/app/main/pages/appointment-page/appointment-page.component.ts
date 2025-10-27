import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectedAppointment} from "../../store/selectors";
import {Appointment} from "../../model/appointment.model";
import {clearSelectedAppointment, findAppointmentByUuid} from "../../store/actions";
import {hideNavBar} from "../../../shared/store/actions";
import {CommonModule} from '@angular/common';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {DataService} from "../../services/data.service";
import {AppointmentState} from "../../model/enums/appointment-state.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {Button} from "primeng/button";
import {User} from "../../../auth/model/user.model";
import {AuthService} from "../../../auth/service/auth.service";
import {MainService} from "../../services/main.service";

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
export class AppointmentPageComponent implements OnInit, OnDestroy {

  selectedAppointment!: Appointment;
  appointmentUuid!: string;
  loggedUser!: User;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  dateTimeFormat = 'HH:mm';

  constructor(private store$: Store,
              private router: Router,
              private mainService: MainService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private dataService: DataService) {
    this.initSelectors();
  }

  ngOnInit(): void {
    this.initDispatch();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearSelectedAppointment());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initSelectors(): void {
    this.authService.getLoggedUser()?.subscribe(value => this.loggedUser = value);
    this.appointmentUuid = this.route.snapshot.params['appointmentUuid'];
    this.selectScheduledAppointment();
  }

  private selectScheduledAppointment(): void {
    this.store$.select(selectedAppointment)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.selectedAppointment = value;
      });
  }

  getStatusColor(state: AppointmentState): string {
    return this.dataService.getAppointmentStateColor(state);
  }

  getStatusIcon(state: AppointmentState): string {
    return this.dataService.getAppointmentStatusIcon(state);
  }

  onCancel(): void {
    this.mainService.cancelAppointment(this.selectedAppointment, this.return);
  }

  translateAppointmentState(appointmentState: AppointmentState) {
    return this.dataService.translateAppointmentState(appointmentState);
  }

  getDuration(duration: number | undefined) {
    return this.dataService.getDuration(duration);
  }

  private initDispatch() {
    this.store$.dispatch(hideNavBar());
    this.store$.dispatch(findAppointmentByUuid({appointmentUuid: this.appointmentUuid}));
  }

  protected readonly AppointmentState = AppointmentState;

  return = () => {
    this.router.navigate(['my-appointments']);
  }
}
