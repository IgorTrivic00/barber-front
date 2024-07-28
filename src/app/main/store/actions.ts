import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../model/barber.model";

export const getBarbers = createAction(MainActionsConstants.GetBarbers);
export const getBarbersSuccess = createAction(MainActionsConstants.GetBarbersSuccess,
  props< {barbers: Barber[]} >());

const all = union({
  getBarbers,
  getBarbersSuccess
});

export type MainActions = typeof all;
