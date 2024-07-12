import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../reducers/auth.reducer';

export const authSelectorKey = 'auth';

/**
 * Creates a selector for the whole auth state.
 */
export const getAuthState = createFeatureSelector<AuthState>(authSelectorKey);

/** Creates a selector for the auth state.errorMessage */
export const getLoginErrorType = createSelector(
  getAuthState,
  (state: AuthState) => state.errorMessage,
);

/** Creates a selector for the auth state.loading */
export const getLoginLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading,
);

/** Creates a selector for the auth state.user */
export const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user,
);

/** Creates a selector for the auth state.isLoggedIn */
export const getIsLoggedIn = createSelector(
  getAuthState,
  (state: AuthState) => state.isLoggedIn,
);

/** Creates a selector for the auth state.resetPasswordSuccess */
export const getResetPasswordSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.resetPasswordSuccess,
);
