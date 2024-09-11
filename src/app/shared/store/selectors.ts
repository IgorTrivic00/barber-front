import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {CommonState, INIT_COMMON_STATE} from "./state";

export const getIsLoading = (state: CommonState) => state.isLoading;
export const getLastUrl = (state: CommonState) => state.lastUrl;

export const selectCommonState: MemoizedSelector<object, any> = createFeatureSelector<CommonState>('common');

export const selectSpinner: MemoizedSelector<object, any> = createSelector(selectCommonState, getIsLoading);
export const selectLastUrl: MemoizedSelector<object, any> = createSelector(selectCommonState, getLastUrl);

