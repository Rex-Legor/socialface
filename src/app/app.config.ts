import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './state/reducers/auth.reducer';
import { AuthEffects } from './state/effects/auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './app.interceptor';
import { authSelectorKey } from './state/selectors/auth.selector';
import { feedSelectorKey } from './state/selectors/feed.selector';
import { feedReducer } from './state/reducers/feed.reducer';
import { FeedEffects } from './state/effects/feed.effects';

/**
 * Application config providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([appInterceptor])),
    provideStore(),
    provideState({
      name: authSelectorKey,
      reducer: authReducer,
    }),
    provideState({
      name: feedSelectorKey,
      reducer: feedReducer,
    }),
    provideEffects([AuthEffects, FeedEffects]),
  ],
};
