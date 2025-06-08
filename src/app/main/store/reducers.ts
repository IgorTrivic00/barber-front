import {INIT_MAIN_STATE, MainState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {
  addServiceSuccess,
  deleteServiceSuccess,
  searchServicesSuccess,
  getBarbersSuccess,
  MainActions,
  updateServiceSuccess, clearServiceSearch, searchServices
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
  }))
);

export function authReducer(state: MainState | undefined, action: MainActions): MainState {
  return _mainReducer(state, action);
}
