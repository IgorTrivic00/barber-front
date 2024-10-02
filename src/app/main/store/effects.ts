import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MainApiService} from "../api/main-api.service";
import {of, switchMap, tap} from "rxjs";
import {showMessage} from "../../shared/store/actions";
import {
  addService, addServiceSuccess,
  getBarbers,
  getBarberServices,
  getBarberServicesSuccess,
  getBarbersSuccess,
  updateCustomer,
  updateCustomerSuccess
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

}
