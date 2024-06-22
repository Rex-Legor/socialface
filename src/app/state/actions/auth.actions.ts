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
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ user: IUser }>(),
);

export const loginError = createAction(
  AuthActionTypes.LoginError,
  props<{ errorMessage: string }>(),
);

export const signUp = createAction(
  AuthActionTypes.SignUp,
  props<{ user: IUser }>(),
);

export const signupSuccess = createAction(
  AuthActionTypes.SignUpSuccess,
  props<{ user: IUser }>(),
);

export const signupError = createAction(
  AuthActionTypes.SignUpError,
  props<{ errorMessage: string }>(),
);

export const resetPassword = createAction(
  AuthActionTypes.SignUp,
  props<{ email: string }>(),
);

export const resetPasswordSuccess = createAction(AuthActionTypes.SignUpSuccess);

export const resetPasswordError = createAction(
  AuthActionTypes.SignUpError,
  props<{ errorMessage: string }>(),
);
