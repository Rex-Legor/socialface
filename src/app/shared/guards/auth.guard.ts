import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

import { AuthState } from '../../state/reducers/auth.reducer';
import { getUser } from '../../state/selectors/auth.selector';

/**
 * Validates if an authenticated user is present, if not it will redirect to the login page.
 * @param route
 * @param state
 * @returns
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store: Store<AuthState> = inject(Store<AuthState>);
  const router = inject(Router);

  return store.pipe(
    select(getUser),
    map((user) => {
      if (!user) router.navigate(['/login']);

      if (
        user &&
        route.routeConfig?.path == 'business' &&
        user?.canAccessBusiness
      ) {
        return true;
      }

      return !!user;
    }),
  );
};
