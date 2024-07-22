import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {AuthState} from "./state";

export const getUserSession = (state: AuthState) => state.userSession;
export const getLoggedUser = (state: AuthState) => state.userSession.user;
export const getToken = (state: AuthState) => state.userSession.token;

export const selectAuthState: MemoizedSelector<object, any> = createFeatureSelector<AuthState>('auth');

export const selectUserSession: MemoizedSelector<object, any> = createSelector(selectAuthState, getUserSession);
export const selectLoggedUser: MemoizedSelector<object, any> = createSelector(selectAuthState, getLoggedUser);
export const selectToken: MemoizedSelector<object, any> = createSelector(selectAuthState, getToken);
