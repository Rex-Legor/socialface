import usersData from '../../../../server/data/users-data.json';

import { IUser } from '../../shared/models/user.model';
import * as authActions from '../actions/auth.actions';
import { authReducer, initialState } from './auth.reducer';
const user: IUser = {
  birthDate: '',
  country: '',
  email: usersData.users[0].email,
  firstName: usersData.users[0].firstName,
  lastName: usersData.users[0].lastName,
  id: '123',
  profilePicture: usersData.users[0].profilePicture,
  notificationPreference: 'email',
};

const email = 'testemail@mail.com';

describe('auth reducer', () => {
  it('Should change loading to true when login', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(
      initialState,
      authActions.login({ email, password: '123' }),
    );
    expect(state.loading).toBe(true);
  });

  it('Should handle login success', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(initialState, authActions.loginSuccess({ user }));
    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.user).toBe(user);
  });

  it('Should handle login error', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(
      initialState,
      authActions.loginError({ errorMessage: 'something happened' }),
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe('something happened');
    expect(state.user).toBe(null);
  });

  it('Should handle signup', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(initialState, authActions.signUp({ user }));
    expect(state.loading).toBe(true);
  });

  it('Should handle signup success', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(
      initialState,
      authActions.signupSuccess({ user }),
    );
    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.user).toBe(user);
  });

  it('Should handle signup error', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(
      initialState,
      authActions.signupError({ errorMessage: 'something happened' }),
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe('something happened');
    expect(state.user).toBe(null);
  });

  it('Should handle reset password', () => {
    const state = authReducer(
      initialState,
      authActions.resetPassword({ email }),
    );
    expect(state.loading).toBe(true);
  });

  it('Should handle reset password success', () => {
    const state = authReducer(initialState, authActions.resetPasswordSuccess());
    expect(state.loading).toBe(false);
    expect(state.resetPasswordSuccess).toBe(true);
  });

  it('Should handle reset password error', () => {
    expect(initialState.loading).toBe(false);
    const state = authReducer(
      initialState,
      authActions.resetPasswordError({ errorMessage: 'something happened' }),
    );
    expect(state.resetPasswordSuccess).toBe(false);
    expect(state.errorMessage).toBe('something happened');
  });

  it('Should handle update user success', () => {
    const state = authReducer(
      initialState,
      authActions.updateUserSuccess({ user }),
    );
    expect(state.user).toBe(user);
  });

  it('Should handle logout', () => {
    const state = authReducer(initialState, authActions.logout());
    expect(state).toStrictEqual({
      ...initialState,
      user: null,
      isLoggedIn: false,
    });
  });
});
