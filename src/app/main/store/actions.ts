import {createAction, props, union} from "@ngrx/store";
import {MainActionsConstants} from "../constants/constants";
import {Barber} from "../../auth/model/barber.model";
import {Service} from "../model/service.model";
import {SearchResponse} from "../model/search-response.model";
import {SlotFilter} from "../model/slot-filter.model";
import {Slot} from "../model/slot.model";
import {Appointment} from "../model/appointment.model";

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

export const selectAppointment = createAction(MainActionsConstants.SelectAppointment,
  props< {appointment: Appointment} >());

export const clearSelectedAppointment = createAction(MainActionsConstants.ClearSelectedAppointment);

export const searchAppointmentsSuccess = createAction(MainActionsConstants.SearchAppointmentsSuccess,
  props< {response: SearchResponse<Appointment>} >());

export const clearAppointmentSearch = createAction(MainActionsConstants.ClearAppointmentSearch);


const all = union({
  searchSlots,
  searchSlotsSuccess,
  clearSlotSearch,
  selectBarber,
  selectService,
  clearSelectBarber,
  clearSelectService,
  selectAppointment,
  clearSelectedAppointment,
  searchAppointmentsSuccess,
  clearAppointmentSearch
});

export type MainActions = typeof all;
