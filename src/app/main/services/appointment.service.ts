import {inject, Injectable} from "@angular/core";
import {AppointmentApiService} from "../api/appointment-api.service";
import {Appointment} from "../model/appointment.model";
import {AppointmentFilter} from "../model/appointment-filter.model";
import {ToastrService} from "../../shared/service/toastr.service";
import {Severity} from "../../shared/constants/constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AppointmentService{

  private apiService = inject(AppointmentApiService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  schedule(appointment: Appointment){
    this.apiService.schedule(appointment).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Uspešno ste zakazali termin!")
      this.router.navigate(['appointment', appointment.uuid]);
      // selectAppointment({ appointment: response }),
    });
  }

  findByUuid(uuid: string){
    this.apiService.findByUuid(uuid).subscribe(value => {
      // selectAppointment({ appointment: response })
    });
  }

  findMine(filter: AppointmentFilter){
    this.apiService.findMine(filter).subscribe(value => {
      // searchAppointmentsSuccess({response})
    });
  }

  cancel(appointment: Appointment, callbackFn?: () => any){
    this.apiService.cancel(appointment).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Uspešno ste otkazali termin!");
      if(callbackFn){
        callbackFn();
      }
    });
  }

  complete(appointment: Appointment, callbackFn?: () => any) {
    this.apiService.complete(appointment).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Uspešno ste zatvorili termin!");
      if(callbackFn){
        callbackFn();
      }
    });
  }

}
