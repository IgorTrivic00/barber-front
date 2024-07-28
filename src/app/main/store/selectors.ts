import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {MainState} from "./state";

export const getBarbers = (state: MainState) => state.barbers;

export const selectMainState: MemoizedSelector<object, any> = createFeatureSelector<MainState>('main');

export const selectBarbers: MemoizedSelector<object, any> = createSelector(selectMainState, getBarbers);
