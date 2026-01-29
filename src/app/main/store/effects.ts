import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MainApiService} from "../api/main-api.service";
import {map, of, switchMap, tap} from "rxjs";
import {
  updateCustomer,
  updateCustomerSuccess,
  searchSlots,
  searchSlotsSuccess,
  selectBarber,
  selectService,
  clearSelectBarber,
  clearSelectService,
  scheduleAppointment,
  selectAppointment,
  clearSelectedAppointment,
  findAppointmentByUuid,
  scheduleAppointmentSuccess,
  findAppointmentByUuidSuccess,
  findMyAppointments,
  searchAppointmentsSuccess,
  cancelAppointment, cancelAppointmentSuccess, completeAppointment, completeAppointmentSuccess
} from "./actions";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ToastrService} from "../../shared/service/toastr.service";
import {ServiceApiService} from "../api/service-api.service";

@Injectable()
export class MainEffects {

  toastService = inject(ToastrService);

  constructor(private actions$: Actions,
              private mainApi: MainApiService,
              private storageService: LocalStorageService,
              private router: Router) {
  }

  updateCustomerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomer),
    switchMap(action => this.mainApi.updateCustomer(action.customer).pipe(
      switchMap(response => {
        return of(
          updateCustomerSuccess({customer: response}),
          // this.toastService.showMessage(Severity.SUCCESS,"Uspešno sačuvano!")
        )
      })
    ))
  ));

  updateCustomerSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerSuccess),
    tap(() => {
      this.router.navigate(['settings']);
    })
  ), {dispatch: false});

  searchSlotsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(searchSlots),
    switchMap(action => this.mainApi.searchSlots(action.filter).pipe(
      map(response => {
        return {
          ...response,
          data: response.data.map(slot => {
            return {
              ...slot,
              selected: false
            }
          })
        };
      }),
      switchMap(response => {
        return of(
          searchSlotsSuccess({searchResponse: response})
        )
      })
    ))
  ));

  selectBarberEffect$ = createEffect(() => this.actions$.pipe(
    ofType(selectBarber),
    map(action => {
      this.storageService.setSavedState(action.barber, "selectedBarber");
    })
  ), {dispatch: false});

  selectServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(selectService),
    map(action => {
      this.storageService.setSavedState(action.service, "selectedService");
    })
  ), {dispatch: false});

  clearSelectBarberEffect$ = createEffect(() => this.actions$.pipe(
    ofType(clearSelectBarber),
    map(action => {
      this.storageService.setSavedState(null, "selectedBarber");
    })
  ), {dispatch: false});

  clearSelectServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(clearSelectService),
    map(action => {
      this.storageService.setSavedState(null, "selectedService");
    })
  ), {dispatch: false});

  scheduleAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(scheduleAppointment),
    switchMap(action => this.mainApi.scheduleAppointment(action.appointment).pipe(
      switchMap(response => {
        return of(
          selectAppointment({ appointment: response }),
          scheduleAppointmentSuccess({ appointment: response }),
          // this.toastService.showMessage(Severity.SUCCESS,"Uspešno ste zakazali termin!")
        );
      })
    ))
  ));

  scheduleAppointmentSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(scheduleAppointmentSuccess),
    map(action => {
      this.router.navigate(['appointment', action.appointment.uuid]);
    })
  ), {dispatch: false});

  selectAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(selectAppointment),
    map(action => {
      this.storageService.setSavedState(action.appointment, "selectedAppointment");
    })
  ), {dispatch: false});

  clearSelectedAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(clearSelectedAppointment),
    map(action => {
      this.storageService.setSavedState(null, "selectedAppointment");
    })
  ), {dispatch: false});

  findAppointmentByUuidEffect$ = createEffect(() => this.actions$.pipe(
    ofType(findAppointmentByUuid),
    switchMap(action => this.mainApi.findAppointmentByUuid(action.appointmentUuid).pipe(
      switchMap(response => {
        return of(
          findAppointmentByUuidSuccess({ appointment: response }),
          selectAppointment({ appointment: response })
        );
      })
    ))
  ));

  findMyAppointmentsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(findMyAppointments),
    switchMap(action => this.mainApi.findMyAppointments(action.filter).pipe(
      switchMap(response => {
        return of(
          searchAppointmentsSuccess({response})
        );
      })
    ))
  ));

  cancelAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(cancelAppointment),
    switchMap(action => this.mainApi.cancelAppointment(action.appointment).pipe(
      switchMap(response => {
        return of(
          cancelAppointmentSuccess({appointment: response, callbackFn: action.callbackFn}),
          // this.toastService.showMessage(Severity.SUCCESS,"Uspešno ste otkazali termin!")
        );
      })
    ))
  ));

  cancelAppointmentSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(cancelAppointmentSuccess),
    map(action => {
      if(action.callbackFn){
        action.callbackFn();
      }
    })
  ), {dispatch: false});

  completeAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(completeAppointment),
    switchMap(action => this.mainApi.completeAppointment(action.appointment).pipe(
      switchMap(response => {
        return of(
          completeAppointmentSuccess({appointment: response, callbackFn: action.callbackFn}),
          // this.toastService.showMessage(Severity.SUCCESS,"Uspešno ste zatvorili termin!")
        );
      })
    ))
  ));

  completeAppointmentSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(completeAppointmentSuccess),
    map(action => {
      if(action.callbackFn){
        action.callbackFn();
      }
    })
  ), {dispatch: false});
}
