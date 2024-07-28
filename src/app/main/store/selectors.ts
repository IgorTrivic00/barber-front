import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {MainState} from "./state";

export const getBarbers = (state: MainState) => state.barbers;
export const getBarberServices = (state: MainState) => state.barberServices;

export const selectMainState: MemoizedSelector<object, any> = createFeatureSelector<MainState>('main');

export const selectBarbers: MemoizedSelector<object, any> = createSelector(selectMainState, getBarbers);
export const selectBarberServices: MemoizedSelector<object, any> = createSelector(selectMainState, getBarberServices);
