import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { IAuthErrorResponse } from '../../shared/models/auth.model';

@Injectable()
export class AuthEffects {
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

  signup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUp),
        exhaustMap((action) =>
          this.authService.signup(action.user.email).pipe(
            map(() => AuthActions.signupSuccess({ user: action.user })),
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

  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}
}
