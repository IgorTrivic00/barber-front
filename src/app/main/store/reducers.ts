import {INIT_MAIN_STATE, MainState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {getBarbersSuccess, MainActions} from "./actions";


export const _mainReducer = createReducer(INIT_MAIN_STATE,
  on(getBarbersSuccess, (state, {barbers}) => ({
    ...state,
    barbers
  })),
);

export function authReducer(state: MainState | undefined, action: MainActions): MainState {
  return _mainReducer(state, action);
}
