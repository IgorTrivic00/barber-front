import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MainApiService} from "../api/main-api.service";
import {of, switchMap} from "rxjs";
import {showMessage} from "../../shared/store/actions";
import {getBarbers, getBarberServices, getBarberServicesSuccess, getBarbersSuccess} from "./actions";

@Injectable()
export class MainEffects {

  constructor(private actions$: Actions,
              private mainApi: MainApiService) {
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

}