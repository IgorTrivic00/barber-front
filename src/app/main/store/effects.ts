import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MainApiService} from "../api/main-api.service";
import {of, switchMap, tap} from "rxjs";
import {showMessage} from "../../shared/store/actions";
import {
  addService, addServiceSuccess,
  deleteService,
  deleteServiceSuccess,
  getBarbers,
  getBarberServices,
  getBarberServicesSuccess,
  getBarbersSuccess,
  updateCustomer,
  updateCustomerSuccess,
  updateService,
  updateServiceSuccess
} from "./actions";
import {Severity} from "../../shared/constants/constants";
import {Router} from "@angular/router";

@Injectable()
export class MainEffects {

  constructor(private actions$: Actions,
              private mainApi: MainApiService,
              private router: Router) {
  }

  getBarbersEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getBarbers),
    switchMap(action => this.mainApi.getBarbers().pipe(
      switchMap(response => {
        return of(
          getBarbersSuccess({barbers: response})
        )
      })
    ))
  ));

  getBarberServicesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getBarberServices),
    switchMap(action => this.mainApi.getBarberServices(action.barberUuid).pipe(
      switchMap(response => {
        return of(
          getBarberServicesSuccess({services: response})
        )
      })
    ))
  ));

  updateCustomerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomer),
    switchMap(action => this.mainApi.updateCustomer(action.customer).pipe(
      switchMap(response => {
        return of(
          updateCustomerSuccess({customer: response}),
          showMessage({severity: Severity.SUCCESS, detail: "Uspešno sačuvano"}),
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

  addServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(addService),
    switchMap(action => this.mainApi.addService(action.service).pipe(
      switchMap(response => {
        return of(
          addServiceSuccess({service: response}),
          showMessage({severity: Severity.SUCCESS, detail: "Uspešno sačuvano"}),
        )
      })
    ))
  ));
 
  deleteServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(deleteService),
    switchMap(action => this.mainApi.deleteService(action.serviceUuid).pipe(
      switchMap(() => {
        return of(
          deleteServiceSuccess({ serviceUuid: action.serviceUuid }),
          showMessage({ severity: Severity.SUCCESS, detail: "Usluga je uspešno obrisana" })
        );
      })
    ))
  ));

  updateServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateService),
    switchMap(action => this.mainApi.updateService(action.service).pipe(
      switchMap(response => {
        return of(
          updateServiceSuccess({ service: response }),
          showMessage({ severity: Severity.SUCCESS, detail: "Usluga uspešno ažurirana" })
        );
      })
    ))
  ));
 

}
