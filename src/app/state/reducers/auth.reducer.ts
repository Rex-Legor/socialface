import * as AuthActions from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';

export interface AuthState {
  isLoggedIn: boolean;
  resetPasswordSuccess: boolean;
  user: IUser | null;
  loading: boolean;
  errorMessage: string;
}

const userPersisted = localStorage.getItem('sf-user');

export const initialState: AuthState = {
  isLoggedIn: false,
  user: userPersisted ? JSON.parse(userPersisted) : null,
  loading: false,
  errorMessage: '',
  resetPasswordSuccess: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(AuthActions.loginSuccess, (state, response) => {
    localStorage.setItem('sf-user', JSON.stringify(response.user));
    return {
      ...state,
      user: response.user,
      loading: false,
      errorMessage: '',
      isLoggedIn: true,
    };
  }),

  on(AuthActions.loginError, (state, response) => ({
    ...state,
    errorMessage: response.errorMessage,
    loading: false,
  })),

  on(AuthActions.signUp, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(AuthActions.signupSuccess, (state, response) => {
    localStorage.setItem('sf-user', JSON.stringify(response.user));
    return {
      ...state,
      user: response.user,
      loading: false,
      errorMessage: '',
      isLoggedIn: true,
    };
  }),

  on(AuthActions.signupError, (state, response) => ({
    ...state,
    errorMessage: response.errorMessage,
    loading: false,
  })),

  on(AuthActions.resetPassword, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
    resetPasswordSuccess: false,
    isLoggedIn: false,
  })),

  on(AuthActions.resetPasswordSuccess, (state, response) => ({
    ...state,
    loading: false,
    errorMessage: '',
    resetPasswordSuccess: true,
    isLoggedIn: false,
  })),

  on(AuthActions.resetPasswordError, (state, response) => ({
    ...state,
    errorMessage: response.errorMessage,
    loading: false,
    resetPasswordSuccess: false,
    isLoggedIn: false,
  })),
);
