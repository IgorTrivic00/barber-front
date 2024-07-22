import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map} from "rxjs";
import {MessageService} from "primeng/api";
import {showMessage} from "./actions";
import {SeverityMap} from "../constants/constants";

@Injectable()
export class CommonEffects {

  constructor(private store$: Store,
              private action$: Actions,
              private messageService: MessageService) {
  }

  successMessageEffect$ = createEffect(() => this.action$.pipe(
    ofType(showMessage),
    map( action  => {
      this.messageService.add({severity: action.severity, summary: SeverityMap.get(action.severity), detail: action.detail});
    })
  ), {dispatch: false});


}
