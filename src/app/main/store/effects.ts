import {Injectable} from "@angular/core";
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
  selectAppointment,
  clearSelectedAppointment,
} from "./actions";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Injectable()
export class MainEffects {

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
}
