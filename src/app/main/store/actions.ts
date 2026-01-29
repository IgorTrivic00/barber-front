import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";

export const selectBarber = createAction(MainActionsConstants.SelectBarber,
  props< {barber: Barber} >());

export const clearSelectBarber = createAction(MainActionsConstants.ClearSelectBarber);

export const selectService = createAction(MainActionsConstants.SelectService,
  props< {service: Service} >());

export const clearSelectService = createAction(MainActionsConstants.ClearSelectService);


const all = union({
  selectBarber,
  selectService,
  clearSelectBarber,
  clearSelectService
});

export type MainActions = typeof all;
