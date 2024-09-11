import {createReducer, on} from "@ngrx/store";
import {CommonState, INIT_COMMON_STATE} from "./state";
import {Actions, closeSpinner, openSpinner, updateLastUrl} from "./actions";

export const _commonReducer = createReducer(INIT_COMMON_STATE,
  on(openSpinner, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(closeSpinner, (state) => {
    return {
      ...state,
      isLoading: false
    }
  }),
  on(updateLastUrl, (state, action) => {
    return {
      ...state,
      lastUrl: action.lastUrl
    }
  })
);

export function commonReducer(state: CommonState | undefined, action: Actions): CommonState {
  return _commonReducer(state, action);
}
