import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const authSelectorKey = 'auth';

export const getAuthState = createFeatureSelector<AuthState>(authSelectorKey);

export const getLoginErrorType = createSelector(
  getAuthState,
  (state: AuthState) => state.errorMessage,
);

export const getLoginLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading,
);

export const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user,
);

export const getIsLoggedIn = createSelector(
  getAuthState,
  (state: AuthState) => state.isLoggedIn,
);

export const getResetPasswordSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.resetPasswordSuccess,
);
