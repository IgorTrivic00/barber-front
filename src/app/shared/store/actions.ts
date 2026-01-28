import {createAction, props, union} from "@ngrx/store";
import {CommonActions, Severity} from "../constants/constants";


export const showMessage = createAction(CommonActions.SuccessMessage,
  props< { severity: Severity, detail?: string }>());

export const updateLastUrl = createAction(CommonActions.UpdateLastUrl,
  props< { lastUrl: string }>());

export const updateCurrentUrl = createAction(CommonActions.UpdateCurrentUrl,
  props< { currentUrl: string }>());

export const returnToPreviousPage = createAction(CommonActions.ReturnToPreviousPage);

const all = union({
  showMessage,
  updateCurrentUrl,
  updateLastUrl,
  returnToPreviousPage
});

export type Actions = typeof all;

