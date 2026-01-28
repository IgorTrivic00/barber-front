import {createAction, props, union} from "@ngrx/store";
import {CommonActions} from "../constants/constants";

export const updateLastUrl = createAction(CommonActions.UpdateLastUrl,
  props< { lastUrl: string }>());

export const updateCurrentUrl = createAction(CommonActions.UpdateCurrentUrl,
  props< { currentUrl: string }>());

export const returnToPreviousPage = createAction(CommonActions.ReturnToPreviousPage);

const all = union({
  updateCurrentUrl,
  updateLastUrl,
  returnToPreviousPage
});

export type Actions = typeof all;

