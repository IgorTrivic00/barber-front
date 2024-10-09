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

export const deleteService = createAction(MainActionsConstants.DeleteService,
  props<{ serviceUuid: string }>());

export const deleteServiceSuccess = createAction(MainActionsConstants.DeleteServiceSuccess,
  props<{ serviceUuid: string }>());

// Dodavanje akcija za ažuriranje usluge
export const updateService = createAction(MainActionsConstants.UpdateService,
  props< {service: Service} >());

export const updateServiceSuccess = createAction(MainActionsConstants.UpdateServiceSuccess,
  props< {service: Service} >());

const all = union({
  getBarbers,
  getBarbersSuccess,
  getBarberServices,
  getBarberServicesSuccess,
  updateCustomer,
  updateCustomerSuccess,
  addService,
  addServiceSuccess,
  deleteService,
  deleteServiceSuccess,
  updateService,
  updateServiceSuccess

});

export type MainActions = typeof all;
