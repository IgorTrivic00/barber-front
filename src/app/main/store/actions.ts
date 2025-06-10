import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {Customer} from "../../auth/model/customer.model";
import {ServiceFilter} from "../model/service-filter.model";
import {SearchResponse} from "../model/search-response.model";

export const getBarbers = createAction(MainActionsConstants.GetBarbers);

export const getBarbersSuccess = createAction(MainActionsConstants.GetBarbersSuccess,
  props< {barbers: Barber[]} >());

export const searchServices = createAction(MainActionsConstants.SearchServices,
  props< {filter: ServiceFilter} >());

export const searchServicesSuccess = createAction(MainActionsConstants.SearchServicesSuccess,
  props< {searchResponse: SearchResponse<Service>} >());

export const findMyServices = createAction(MainActionsConstants.FindMyServices);

export const clearServiceSearch = createAction(MainActionsConstants.ClearServiceSearch);

export const updateCustomer = createAction(MainActionsConstants.UpdateCustomer,
  props< {customer: Customer} >());

export const updateCustomerSuccess = createAction(MainActionsConstants.UpdateCustomerSuccess,
  props< {customer: Customer} >());

export const addService = createAction(MainActionsConstants.AddService,
  props< {service: Service, callbackFn?: () => any} >());

export const addServiceSuccess = createAction(MainActionsConstants.AddServiceSuccess,
  props< {service: Service, callbackFn?: () => any} >());

export const deleteService = createAction(MainActionsConstants.DeleteService,
  props<{uuid: string | undefined, callbackFn?: () => any}>());

export const deleteServiceSuccess = createAction(MainActionsConstants.DeleteServiceSuccess,
  props<{service: Service, callbackFn?: () => any} >());

export const updateService = createAction(MainActionsConstants.UpdateService,
  props< {service: Service, callbackFn?: () => any} >());

export const updateServiceSuccess = createAction(MainActionsConstants.UpdateServiceSuccess,
  props< {service: Service, callbackFn?: () => any} >());

const all = union({
  getBarbers,
  getBarbersSuccess,
  searchServices,
  searchServicesSuccess,
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
