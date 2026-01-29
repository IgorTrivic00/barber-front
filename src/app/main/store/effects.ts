import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map} from "rxjs";
import {
  selectBarber,
  selectService,
  clearSelectBarber,
  clearSelectService
} from "./actions";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Injectable()
export class MainEffects {

  constructor(private actions$: Actions,
              private storageService: LocalStorageService) {
  }

  selectBarberEffect$ = createEffect(() => this.actions$.pipe(
    ofType(selectBarber),
    map(action => {
      this.storageService.setSavedState(action.barber, "selectedBarber");
    })
  ), {dispatch: false});

  clearSelectBarberEffect$ = createEffect(() => this.actions$.pipe(
    ofType(clearSelectBarber),
    map(action => {
      this.storageService.setSavedState(null, "selectedBarber");
    })
  ), {dispatch: false});

  selectServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(selectService),
    map(action => {
      this.storageService.setSavedState(action.service, "selectedService");
    })
  ), {dispatch: false});

  clearSelectServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(clearSelectService),
    map(action => {
      this.storageService.setSavedState(null, "selectedService");
    })
  ), {dispatch: false});
}
