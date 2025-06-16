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

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class AppointmentPageComponent implements OnInit, OnDestroy {

  scheduledAppointment!: Appointment;
  appointmentUuid!: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  dateTimeFormat = 'HH:mm';

  constructor(private store$: Store,
              private router: Router,
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
    this.appointmentUuid = this.route.snapshot.params['appointmentUuid'];
    this.selectScheduledAppointment();
  }

  private selectScheduledAppointment(): void {
    this.store$.select(selectedAppointment)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.scheduledAppointment = value;
      });
  }

  getStatusColor(state: AppointmentState): string {
    switch(state) {
      case AppointmentState.SCHEDULED: return 'status-pending';
      case AppointmentState.COMPLETED: return 'status-completed';
      case AppointmentState.CANCELLED: return 'status-cancelled';
      default: return 'status-default';
    }
  }

  getStatusIcon(state: AppointmentState): string {
    switch(state) {
      case AppointmentState.SCHEDULED: return '⏳';
      case AppointmentState.COMPLETED: return '✅';
      case AppointmentState.CANCELLED: return '✗';
      default: return '📅';
    }
  }

  onCheck(): void {
    this.router.navigate(['my-appointments']);
  }

  onCancel(): void {
    console.log('Cancel appointment:', this.scheduledAppointment.uuid);
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
}
