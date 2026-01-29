import {inject, Injectable} from "@angular/core";
import {Appointment} from "../model/appointment.model";
import {ConfirmationService} from "primeng/api";
import {Store} from "@ngrx/store";
import {AppointmentService} from "./appointment.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private appointmentService = inject(AppointmentService);

  constructor(private confirmationService: ConfirmationService,
              private store$: Store) {
  }

    cancelAppointment(appointment: Appointment | undefined, callbackFn: any) {
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da otkažete termin?',
      header: 'Otkazivanje termina',
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Ne',
      rejectButtonStyleClass: 'secondary',
      acceptLabel: 'Da',
      accept: () => {
        this.appointmentService.cancel(appointment, callbackFn);
      }
    });
  }

  completeAppointment(appointment: Appointment, callbackFn: any) {
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da završite termin?',
      header: 'Zatvaranje termina',
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Ne',
      rejectButtonStyleClass: 'secondary',
      acceptLabel: 'Da',
      accept: () => {
        this.appointmentService.complete(appointment, callbackFn);
      }
    });
  }
}
