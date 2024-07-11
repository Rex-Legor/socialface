import { Action, createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';

enum AuthActionTypes {
  Login = '[Login Page] Login',
  LoginComplete = '[Login Page] Login Complete',
  LoginSuccess = '[Auth API] Login Success',
  LoginError = '[Auth API] Login Error',
  SignUp = '[Signup Page] Signup',
  SignUpSuccess = '[Signup Page] Signup Success',
  SignUpError = '[Signup Page] Signup Error',
  ResetPassword = '[ResetPassword Page] Signup',
  ResetPasswordSuccess = '[ResetPassword Page] ResetPassword Success',
  ResetPasswordError = '[ResetPassword Page] ResetPassword Error',
  UpdateUser = '[Settings Page] Update User',
  UpdateUserSuccess = '[Settings Page] Update User Success',
  Logout = '[Logout Page] Logout',
}

/**
 * Called from auth effects for making api call.
 */
export const login = createAction(
  AuthActionTypes.Login,
  props<{ email: string; password: string }>(),
);

/** Restores to initial state in the reducer. */
export const logout = createAction(AuthActionTypes.Logout);

/**
 * Passes the user obtained from the api call made from auth effects.
 */
export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ user: IUser }>(),
);

/**
 * Passes the api call error made from auth effects.
 */
export const loginError = createAction(
  AuthActionTypes.LoginError,
  props<{ errorMessage: string }>(),
);

/** Called from auth effects for making api call. */
export const signUp = createAction(
  AuthActionTypes.SignUp,
  props<{ user: IUser }>(),
);

/**
 * Passes the user obtained from the api call made from auth effects.
 */
export const signupSuccess = createAction(
  AuthActionTypes.SignUpSuccess,
  props<{ user: IUser }>(),
);

/**
 * Passes the api call error made from auth effects.
 */
export const signupError = createAction(
  AuthActionTypes.SignUpError,
  props<{ errorMessage: string }>(),
);

/**
 * Called from auth effects for making api call.
 */
export const resetPassword = createAction(
  AuthActionTypes.ResetPassword,
  props<{ email: string }>(),
);

/**
 * Updates the auth reducer for indicating reset password success.
 */
export const resetPasswordSuccess = createAction(
  AuthActionTypes.ResetPasswordSuccess,
);

/**
 * Passes the api call error made from auth effects.
 */
export const resetPasswordError = createAction(
  AuthActionTypes.ResetPasswordError,
  props<{ errorMessage: string }>(),
);

/**
 * Called from auth effects for making api call.
 */
export const updateUser = createAction(
  AuthActionTypes.UpdateUser,
  props<{ user: IUser }>(),
);

/**
 * Upodates the auth reducer with the updated user.
 */
export const updateUserSuccess = createAction(
  AuthActionTypes.UpdateUserSuccess,
  props<{ user: IUser }>(),
);
