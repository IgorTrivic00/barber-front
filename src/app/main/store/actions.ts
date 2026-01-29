import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {Customer} from "../../auth/model/customer.model";
import {ServiceFilter} from "../model/service-filter.model";
import {SearchResponse} from "../model/search-response.model";
import {SlotFilter} from "../model/slot-filter.model";
import {Slot} from "../model/slot.model";
import {Appointment} from "../model/appointment.model";
import {AppointmentFilter} from "../model/appointment-filter.model";

export const findMyServices = createAction(MainActionsConstants.FindMyServices);

export const updateCustomer = createAction(MainActionsConstants.UpdateCustomer,
  props< {customer: Customer} >());

export const updateCustomerSuccess = createAction(MainActionsConstants.UpdateCustomerSuccess,
  props< {customer: Customer} >());

export const searchSlots = createAction(MainActionsConstants.SearchSlots,
  props< {filter: SlotFilter} >());

export const searchSlotsSuccess = createAction(MainActionsConstants.SearchSlotsSuccess,
  props< {searchResponse: SearchResponse<Slot>} >());

export const clearSlotSearch = createAction(MainActionsConstants.ClearSlotSearch);

export const selectBarber = createAction(MainActionsConstants.SelectBarber,
  props< {barber: Barber} >());

export const clearSelectBarber = createAction(MainActionsConstants.ClearSelectBarber);

export const selectService = createAction(MainActionsConstants.SelectService,
  props< {service: Service} >());

export const clearSelectService = createAction(MainActionsConstants.ClearSelectService);

export const scheduleAppointment = createAction(MainActionsConstants.ScheduleAppointment,
  props< {appointment: Appointment} >());

export const scheduleAppointmentSuccess = createAction(MainActionsConstants.ScheduleAppointmentSuccess,
  props< {appointment: Appointment} >());

export const selectAppointment = createAction(MainActionsConstants.SelectAppointment,
  props< {appointment: Appointment} >());

export const clearSelectedAppointment = createAction(MainActionsConstants.ClearSelectedAppointment);

export const findAppointmentByUuid = createAction(MainActionsConstants.FindAppointmentByUuid,
  props< {appointmentUuid: string} >());

export const findAppointmentByUuidSuccess = createAction(MainActionsConstants.FindAppointmentByUuidSuccess,
  props< {appointment: Appointment} >());

export const findMyAppointments = createAction(MainActionsConstants.FindMyAppointments,
  props< {filter: AppointmentFilter} >());

export const searchAppointmentsSuccess = createAction(MainActionsConstants.SearchAppointmentsSuccess,
  props< {response: SearchResponse<Appointment>} >());

export const clearAppointmentSearch = createAction(MainActionsConstants.ClearAppointmentSearch);

export const cancelAppointment = createAction(MainActionsConstants.CancelAppointment,
  props< {appointment: Appointment, callbackFn?: () => any} >());

export const cancelAppointmentSuccess = createAction(MainActionsConstants.CancelAppointmentSuccess,
  props< {appointment: Appointment, callbackFn?: () => any} >());

export const completeAppointment = createAction(MainActionsConstants.CompleteAppointment,
  props< {appointment: Appointment, callbackFn?: () => any} >());

export const completeAppointmentSuccess = createAction(MainActionsConstants.CompleteAppointmentSuccess,
  props< {appointment: Appointment, callbackFn?: () => any} >());


const all = union({
  updateCustomer,
  updateCustomerSuccess,
  searchSlots,
  searchSlotsSuccess,
  clearSlotSearch,
  selectBarber,
  selectService,
  clearSelectBarber,
  clearSelectService,
  scheduleAppointment,
  selectAppointment,
  clearSelectedAppointment,
  findAppointmentByUuid,
  findAppointmentByUuidSuccess,
  findMyAppointments,
  searchAppointmentsSuccess,
  clearAppointmentSearch,
  cancelAppointment,
  cancelAppointmentSuccess,
  completeAppointment,
  completeAppointmentSuccess
});

export type MainActions = typeof all;
