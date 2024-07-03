import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../state/reducers/auth.reducer';
import { logout } from '../../state/actions/auth.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getUser } from '../../state/selectors/auth.selector';

@Component({
  selector: 'sf-logout',
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent implements OnDestroy {
  userSubscription: Subscription;

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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
