import {INIT_MAIN_STATE, MainState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {
  MainActions,
  searchSlotsSuccess,
  clearSlotSearch,
  selectBarber,
  selectService,
  clearSelectService,
  searchAppointmentsSuccess,
  clearAppointmentSearch
} from "./actions";


export const _mainReducer = createReducer(INIT_MAIN_STATE,
  on(searchSlotsSuccess, (state, {searchResponse}) => ({
    ...state,
    slotSearchResponse: searchResponse
  })),
  on(clearSlotSearch, (state, {}) => ({
    ...state,
    slotSearchResponse: null
  })),
  on(selectBarber, (state, {barber}) => ({
    ...state,
    selectedBarber: barber
  })),
  on(selectService, (state, {service}) => ({
    ...state,
    selectedService: service
  })),
  on(clearSelectService, (state, {}) => ({
    ...state,
    selectedService: null
  })),
  on(searchAppointmentsSuccess, (state, {response}) => ({
    ...state,
    appointmentSearchResponse: response
  })),
  on(clearAppointmentSearch, (state, {}) => ({
    ...state,
    appointmentSearchResponse: null
  }))
);

export function mainReducer(state: MainState | undefined, action: MainActions): MainState {
  return _mainReducer(state, action);
}
