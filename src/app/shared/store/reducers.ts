import {createReducer, on} from "@ngrx/store";
import {CommonState, INIT_COMMON_STATE} from "./state";
import {Actions, updateCurrentUrl, updateLastUrl} from "./actions";

export const _commonReducer = createReducer(INIT_COMMON_STATE,
  on(updateLastUrl, (state, action) => {
    return {
      ...state,
      lastUrl: action.lastUrl
    }
  }),
  on(updateCurrentUrl, (state, action) => {
    return {
      ...state,
      currentUrl: action.currentUrl
    }
  })
);

export function commonReducer(state: CommonState | undefined, action: Actions): CommonState {
  return _commonReducer(state, action);
}
