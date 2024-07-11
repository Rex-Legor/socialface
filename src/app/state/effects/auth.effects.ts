import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { IAuthErrorResponse } from '../../shared/models/auth.model';

/**
 * Effects component.
 * Check NgRx effects for more information.
 *
 * @author Ricardo Legorreta Mendoza
 */
@Injectable()
export class AuthEffects {
  /**
   * effect function automatically called when dispatching AuthActions.login function.
   */
  logins$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        exhaustMap((action) =>
          this.authService.login(action).pipe(
            map((resp) => AuthActions.loginSuccess({ user: resp.user })),
            catchError((error) => {
              return of(AuthActions.loginError({ errorMessage: error.status }));
            }),
          ),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  /**
   * effect function automatically called when dispatching AuthActions.signup function.
   */
  signup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUp),
        exhaustMap((action) =>
          this.authService.signup(action.user.email).pipe(
            map((response) =>
              AuthActions.signupSuccess({ user: response.user }),
            ),
            catchError((error) => {
              return of(
                AuthActions.signupError({
                  errorMessage: error?.error?.message,
                }),
              );
            }),
          ),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  /**
   * effect function automatically called when dispatching AuthActions.resetPassword function.
   */
  resetPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.resetPassword),
        exhaustMap((action) =>
          this.authService.resetPassword(action.email).pipe(
            map(() => AuthActions.resetPasswordSuccess()),
            catchError((error) => {
              return of(
                AuthActions.resetPasswordError({
                  errorMessage: error?.error?.message,
                }),
              );
            }),
          ),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  /**
   * effect function called automatically when dispatching AuthActions.updateUser function.
   */
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      exhaustMap((action) =>
        this.authService
          .updateUser(action.user)
          .pipe(
            map(() => AuthActions.updateUserSuccess({ user: action.user })),
          ),
      ),
    ),
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}
}
