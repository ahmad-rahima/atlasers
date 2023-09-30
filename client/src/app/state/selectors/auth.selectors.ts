import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAuth = createFeatureSelector('auth');

// export const tokenSelect = createSelector(authSelect, (select: any) => select.token);
