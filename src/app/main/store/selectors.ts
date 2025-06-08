import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {MainState} from "./state";

export const getBarbers = (state: MainState) => state.barbers;
export const getServiceSearchResponse = (state: MainState) => state.serviceSearchResponse;
export const getServices = (state: MainState) => state.serviceSearchResponse?.data;

export const selectMainState: MemoizedSelector<object, any> = createFeatureSelector<MainState>('main');

export const selectBarbers: MemoizedSelector<object, any> = createSelector(selectMainState, getBarbers);
export const selectServiceSearchResponse: MemoizedSelector<object, any> = createSelector(selectMainState, getServiceSearchResponse);
export const selectServices: MemoizedSelector<object, any> = createSelector(selectMainState, getServices);
