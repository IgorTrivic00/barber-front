import {INIT_MAIN_STATE, MainState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {
  searchServicesSuccess,
  getBarbersSuccess,
  MainActions,
  clearServiceSearch,
  searchServices,
  searchSlotsSuccess,
  clearSlotSearch,
  selectBarber,
  selectService,
  clearSelectService, selectAppointment, clearSelectedAppointment
} from "./actions";


export const _mainReducer = createReducer(INIT_MAIN_STATE,
  on(getBarbersSuccess, (state, {barbers}) => ({
    ...state,
    barbers
  })),
  on(searchServices, (state, {filter}) => ({
    ...state,
    lastServiceFilter: filter
  })),
  on(searchServicesSuccess, (state, {searchResponse}) => ({
    ...state,
    serviceSearchResponse: searchResponse
  })),
  on(clearServiceSearch, (state, {}) => ({
    ...state,
    serviceSearchResponse: null
  })),
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
  on(selectAppointment, (state, {appointment}) => ({
    ...state,
    selectedAppointment: appointment
  })),
  on(clearSelectedAppointment, (state, {}) => ({
    ...state,
    selectedAppointment: null
  }))
);

export function authReducer(state: MainState | undefined, action: MainActions): MainState {
  return _mainReducer(state, action);
}
