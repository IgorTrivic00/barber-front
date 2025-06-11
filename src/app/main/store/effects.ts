import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MainApiService} from "../api/main-api.service";
import {map, of, switchMap, tap} from "rxjs";
import {showMessage} from "../../shared/store/actions";
import {
  addService,
  addServiceSuccess,
  deleteService,
  deleteServiceSuccess,
  getBarbers,
  searchServices,
  searchServicesSuccess,
  getBarbersSuccess,
  updateCustomer,
  updateCustomerSuccess,
  updateService,
  updateServiceSuccess,
  findMyServices,
  searchSlots,
  searchSlotsSuccess,
  selectBarber,
  selectService,
  clearSelectBarber,
  clearSelectService
} from "./actions";
import {Severity} from "../../shared/constants/constants";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Injectable()
export class MainEffects {

  constructor(private actions$: Actions,
              private mainApi: MainApiService,
              private storageService: LocalStorageService,
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

  searchServicesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(searchServices),
    switchMap(action => this.mainApi.searchServices(action.filter).pipe(
      switchMap(response => {
        return of(
          searchServicesSuccess({searchResponse: response})
        )
      })
    ))
  ));

  findMyServicesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(findMyServices),
    switchMap(action => this.mainApi.findMyServices().pipe(
      switchMap(response => {
        return of(
          searchServicesSuccess({searchResponse: response})
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
          showMessage({severity: Severity.SUCCESS, detail: "Uspešno sačuvano!"}),
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
          addServiceSuccess({ service: response, callbackFn: action.callbackFn }),
          showMessage({severity: Severity.SUCCESS, detail: "Uspešno sačuvano!"}),
        )
      })
    ))
  ));

  addServiceSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(addServiceSuccess),
    map(action => {
      if(action.callbackFn){
        action.callbackFn();
      }
    })
  ), {dispatch: false});

  deleteServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(deleteService),
    switchMap(action => this.mainApi.deleteService(action.uuid).pipe(
      switchMap((response) => {
        return of(
          deleteServiceSuccess({ service: response, callbackFn: action.callbackFn }),
          showMessage({ severity: Severity.SUCCESS, detail: "Usluga je uspešno obrisana!" })
        );
      })
    ))
  ));

  deleteServiceSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(deleteServiceSuccess),
    map(action => {
      if(action.callbackFn){
        action.callbackFn();
      }
    })
  ), {dispatch: false});

  updateServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateService),
    switchMap(action => this.mainApi.updateService(action.service).pipe(
      switchMap(response => {
        return of(
          updateServiceSuccess({ service: response, callbackFn: action.callbackFn }),
          showMessage({ severity: Severity.SUCCESS, detail: "Usluga uspešno ažurirana!" })
        );
      })
    ))
  ));

  updateServiceSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateServiceSuccess),
    map(action => {
      if(action.callbackFn){
        action.callbackFn();
      }
    })
  ), {dispatch: false});

  searchSlotsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(searchSlots),
    switchMap(action => this.mainApi.searchSlots(action.filter).pipe(
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
}
