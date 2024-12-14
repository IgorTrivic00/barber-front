import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {filter, map, withLatestFrom} from "rxjs";
import {MessageService} from "primeng/api";
import {returnToPreviousPage, showMessage} from "./actions";
import {SeverityMap} from "../constants/constants";
import {selectLastUrl} from "./selectors";
import {Router} from "@angular/router";

@Injectable()
export class CommonEffects {

  private _lastUrl: string | undefined;

  constructor(private store$: Store,
              private action$: Actions,
              private router: Router,
              private messageService: MessageService) {
    this.store$.select(selectLastUrl)
      .pipe(filter(Boolean))
      .subscribe(value => this._lastUrl = value);
  }

  successMessageEffect$ = createEffect(() => this.action$.pipe(
    ofType(showMessage),
    map( action  => {
      this.messageService.add({severity: action.severity, summary: SeverityMap.get(action.severity), detail: action.detail});
    })
  ), {dispatch: false});

  returnToPreviousPageEffect$ = createEffect(() => this.action$.pipe(
    ofType(returnToPreviousPage),
    map( action  => {
      this.router.navigate([this._lastUrl]);
    })
  ), {dispatch: false});

}
