import {INIT_MAIN_STATE, MainState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {
  MainActions,
  selectBarber,
  selectService,
  clearSelectService
} from "./actions";


export const _mainReducer = createReducer(INIT_MAIN_STATE,
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
  }))
);

export function mainReducer(state: MainState | undefined, action: MainActions): MainState {
  return _mainReducer(state, action);
}
