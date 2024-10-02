import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {Customer} from "../../auth/model/customer.model";

export const getBarbers = createAction(MainActionsConstants.GetBarbers);

export const getBarbersSuccess = createAction(MainActionsConstants.GetBarbersSuccess,
  props< {barbers: Barber[]} >());

export const getBarberServices = createAction(MainActionsConstants.GetBarberServices,
  props< {barberUuid: string} >());

export const getBarberServicesSuccess = createAction(MainActionsConstants.GetBarberServicesSuccess,
  props< {services: Service[]} >());

export const updateCustomer = createAction(MainActionsConstants.UpdateCustomer,
  props< {customer: Customer} >());

export const updateCustomerSuccess = createAction(MainActionsConstants.UpdateCustomerSuccess,
  props< {customer: Customer} >());

export const addService = createAction(MainActionsConstants.AddService,
  props< {service: Service} >());

export const addServiceSuccess = createAction(MainActionsConstants.AddServiceSuccess,
  props< {service: Service} >());

const all = union({
  getBarbers,
  getBarbersSuccess,
  getBarberServices,
  getBarberServicesSuccess,
  updateCustomer,
  updateCustomerSuccess,
  addService,
  addServiceSuccess
});

export type MainActions = typeof all;
