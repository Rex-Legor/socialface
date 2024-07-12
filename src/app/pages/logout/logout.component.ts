import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { logout } from '../../state/actions/auth.actions';
import { AuthState } from '../../state/reducers/auth.reducer';
import { getUser } from '../../state/selectors/auth.selector';

/**
 * Page component with no html content used for logout.
 * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-logout',
  standalone: true,
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent implements OnDestroy {
  userSubscription: Subscription;

  /**
   * Dispatches logout and then redirects the user to the login page.
   * @param store - Injects auth store.
   * @param router - Injects Router
   */
  constructor(
    private store: Store<AuthState>,
    private router: Router,
  ) {
    this.store.dispatch(logout());
    this.userSubscription = this.store
      .pipe(select(getUser))
      .subscribe((user) => {
        if (!user) this.router.navigate(['/login']);
      });
  }

  /**
   * Used for unsubscribing variables.
   */
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
