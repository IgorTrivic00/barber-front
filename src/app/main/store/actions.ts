import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../model/barber.model";
import {Service} from "../model/service.model";

export const getBarbers = createAction(MainActionsConstants.GetBarbers);

export const getBarbersSuccess = createAction(MainActionsConstants.GetBarbersSuccess,
  props< {barbers: Barber[]} >());

export const getBarberServices = createAction(MainActionsConstants.GetBarberServices,
  props< {barberUuid: string} >());

export const getBarberServicesSuccess = createAction(MainActionsConstants.GetBarberServicesSuccess,
  props< {services: Service[]} >());

const all = union({
  getBarbers,
  getBarbersSuccess,
  getBarberServices,
  getBarberServicesSuccess
});

export type MainActions = typeof all;
