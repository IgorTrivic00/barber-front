import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {MainState} from "./state";

export const getSelectedBarber = (state: MainState) => state.selectedBarber;
export const getSelectedService = (state: MainState) => state.selectedService;

export const selectMainState: MemoizedSelector<object, any> = createFeatureSelector<MainState>('main');

export const selectedBarber: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedBarber);
export const selectedService: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedService);
