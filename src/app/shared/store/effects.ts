import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {filter, map} from "rxjs";
import {returnToPreviousPage} from "./actions";
import {selectLastUrl} from "./selectors";
import {Router} from "@angular/router";

@Injectable()
export class CommonEffects {

  private _lastUrl: string | undefined;

  constructor(private store$: Store,
              private action$: Actions,
              private router: Router) {
    this.store$.select(selectLastUrl)
      .pipe(filter(Boolean))
      .subscribe(value => this._lastUrl = value);
  }

  returnToPreviousPageEffect$ = createEffect(() => this.action$.pipe(
    ofType(returnToPreviousPage),
    map( action  => {
      this.router.navigate([this._lastUrl]);
    })
  ), {dispatch: false});

}
