import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {MainState} from "./state";

export const getBarbers = (state: MainState) => state.barbers;
export const getServiceSearchResponse = (state: MainState) => state.serviceSearchResponse;
export const getServices = (state: MainState) => state.serviceSearchResponse?.data;
export const getLastServiceFilter = (state: MainState) => state.lastServiceFilter;
export const getSlotSearchResponse = (state: MainState) => state.slotSearchResponse;
export const getSlots = (state: MainState) => state.slotSearchResponse?.data;
export const getSelectedBarber = (state: MainState) => state.selectedBarber;
export const getSelectedService = (state: MainState) => state.selectedService;
export const getSelectedAppointment = (state: MainState) => state.selectedAppointment;
export const getAppointmentSearchResponse = (state: MainState) => state.appointmentSearchResponse;
export const getAppointments = (state: MainState) => state.appointmentSearchResponse?.data;

export const selectMainState: MemoizedSelector<object, any> = createFeatureSelector<MainState>('main');

export const selectBarbers: MemoizedSelector<object, any> = createSelector(selectMainState, getBarbers);
export const selectServiceSearchResponse: MemoizedSelector<object, any> = createSelector(selectMainState, getServiceSearchResponse);
export const selectServices: MemoizedSelector<object, any> = createSelector(selectMainState, getServices);
export const selectLastServiceFilter: MemoizedSelector<object, any> = createSelector(selectMainState, getLastServiceFilter);
export const selectSlotSearchResponse: MemoizedSelector<object, any> = createSelector(selectMainState, getSlotSearchResponse);
export const selectSlots: MemoizedSelector<object, any> = createSelector(selectMainState, getSlots);
export const selectedBarber: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedBarber);
export const selectedService: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedService);
export const selectedAppointment: MemoizedSelector<object, any> = createSelector(selectMainState, getSelectedAppointment);
export const selectedAppointmentSearchResponse: MemoizedSelector<object, any> = createSelector(selectMainState, getAppointmentSearchResponse);
export const selectAppointments: MemoizedSelector<object, any> = createSelector(selectMainState, getAppointments);
