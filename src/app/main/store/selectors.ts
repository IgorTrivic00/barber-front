import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {MainState} from "./state";

export const getSlotSearchResponse = (state: MainState) => state.slotSearchResponse;
export const getSlots = (state: MainState) => state.slotSearchResponse?.data;
export const getSelectedBarber = (state: MainState) => state.selectedBarber;
export const getSelectedService = (state: MainState) => state.selectedService;

export const selectMainState: MemoizedSelector<object, any> = createFeatureSelector<MainState>('main');

export const selectSlotSearchResponse: MemoizedSelector<object, any> = createSelector(selectMainState, getSlotSearchResponse);

export const selectSlots: MemoizedSelector<object, any> = createSelector(selectMainState, getSlots);
export const selectedBarber: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedBarber);
export const selectedService: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedService);
