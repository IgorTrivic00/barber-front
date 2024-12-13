import {createAction, props, union} from "@ngrx/store";
import {CommonActions, Severity} from "../constants/constants";

export const openSpinner = createAction(CommonActions.OpenSpinner);

export const closeSpinner = createAction(CommonActions.CloseSpinner);

export const showMessage = createAction(CommonActions.SuccessMessage,
  props< { severity: Severity, detail?: string }>());

export const updateLastUrl = createAction(CommonActions.UpdateLastUrl,
  props< { lastUrl: string }>());

export const updateCurrentUrl = createAction(CommonActions.UpdateCurrentUrl,
  props< { currentUrl: string }>());

export const showNavBar = createAction(CommonActions.ShowNavBar);

export const hideNavBar = createAction(CommonActions.HideNavBar);

const all = union({
  openSpinner,
  closeSpinner,
  showMessage,
  updateCurrentUrl,
  updateLastUrl,
  showNavBar,
  hideNavBar
});

export type Actions = typeof all;

