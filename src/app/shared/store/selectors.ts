import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {CommonState, INIT_COMMON_STATE} from "./state";

export const getIsLoading = (state: CommonState) => state.isLoading;

export const selectCommonState: MemoizedSelector<object, any> = createFeatureSelector<CommonState>('common');

export const selectSpinner: MemoizedSelector<object, any> = createSelector(selectCommonState, getIsLoading);

