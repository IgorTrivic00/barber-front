import {inject, Injectable, signal} from "@angular/core";
import {AppointmentApiService} from "../api/appointment-api.service";
import {Appointment} from "../model/appointment.model";
import {AppointmentFilter} from "../model/appointment-filter.model";
import {ToastrService} from "../../shared/service/toastr.service";
import {Severity} from "../../shared/constants/constants";
import {Router} from "@angular/router";
import {SearchResponse} from "../model/search-response.model";
import {MINE_APPOINTMENT_SEARCH_ID} from "../constants/constants";

@Injectable({
  providedIn: "root"
})
export class AppointmentService{

  private searchCache= signal(new Map<String, SearchResponse<Appointment>>());
  private _selectedAppointment = signal<Appointment | undefined>(undefined);
  private filterCache= new Map<String, AppointmentFilter>();
  private apiService = inject(AppointmentApiService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  schedule(appointment: Appointment){
    this.apiService.schedule(appointment).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Uspešno ste zakazali termin!")
      this.router.navigate(['appointment', appointment.uuid]);
    });
  }

  findByUuid(uuid: string){
    this.apiService.findByUuid(uuid).subscribe(value => {
      this._selectedAppointment.set(value);
    });
  }

  findMine(filter: AppointmentFilter){
    this.apiService.findMine(filter).subscribe(value => {
      this.updateSearchCache(MINE_APPOINTMENT_SEARCH_ID, value);
      this.updateFilterCache(MINE_APPOINTMENT_SEARCH_ID, filter);
    });
  }

  cancel(appointment: Appointment | undefined, callbackFn?: () => any){
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

  getResponse(id: string){
    return this.searchCache().get(id);
  }

  private updateSearchCache(id: string, value: any){
    this.searchCache.update(cache => {
      const next = new Map(cache);
      next.set(id, value);
      return next;
    });
  }

  private updateFilterCache(id: string, filter: AppointmentFilter){
    const filterFromCache = this.filterCache.get(id);
    const merged = {
      ...filterFromCache,
      ...filter
    } as AppointmentFilter;
    this.filterCache.set(id, merged);
    return this.filterCache.get(id);
  }

  get selectedAppointment() {
    return this._selectedAppointment;
  }
}
