import {createAction, props, union} from "@ngrx/store";
import {CommonActions, Severity} from "../constants/constants";

export const openSpinner = createAction(CommonActions.OpenSpinner);

export const closeSpinner = createAction(CommonActions.CloseSpinner);

export const showMessage = createAction(CommonActions.SuccessMessage,
  props< { severity: Severity, detail?: string }>());


const all = union({
  openSpinner,
  closeSpinner,
  showMessage
});

export type Actions = typeof all;

