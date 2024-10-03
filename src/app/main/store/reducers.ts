import {INIT_MAIN_STATE, MainState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {addServiceSuccess, deleteServiceSuccess, getBarberServicesSuccess, getBarbersSuccess, MainActions} from "./actions";


export const _mainReducer = createReducer(INIT_MAIN_STATE,
  on(getBarbersSuccess, (state, {barbers}) => ({
    ...state,
    barbers
  })),
  on(getBarberServicesSuccess, (state, {services}) => ({
    ...state,
    barberServices: services
  })),
  on(addServiceSuccess, (state, {service}) => ({
    ...state,
    barberServices: [...state.barberServices || [], service]
  })),
  on(deleteServiceSuccess, (state, {serviceUuid}) => ({
    ...state,
    barberServices: state.barberServices
      ? state.barberServices.filter(service => service.uuid !== serviceUuid)
      : []
  }))
);

export function authReducer(state: MainState | undefined, action: MainActions): MainState {
  return _mainReducer(state, action);
}
