import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../state/reducers/auth.reducer';
import { getIsLoggedIn } from '../../state/selectors/auth.selector';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const store: Store<AuthState> = inject(Store<AuthState>);
  const router = inject(Router);

  return store.pipe(
    select(getIsLoggedIn),
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/login']);
      }
    }),
  );
};
