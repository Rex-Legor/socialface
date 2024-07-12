import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { appInterceptor } from './app.interceptor';
import { routes } from './app.routes';
import { AuthEffects } from './state/effects/auth.effects';
import { FeedEffects } from './state/effects/feed.effects';
import { authReducer } from './state/reducers/auth.reducer';
import { feedReducer } from './state/reducers/feed.reducer';
import { authSelectorKey } from './state/selectors/auth.selector';
import { feedSelectorKey } from './state/selectors/feed.selector';

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
