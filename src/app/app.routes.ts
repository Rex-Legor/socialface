import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';
import { authGuard } from './shared/guards/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { BusinessComponent } from './pages/business/business.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'business',
    component: BusinessComponent,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./pages/feed/feed.component').then((m) => m.FeedComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent,
      ),
    canActivate: [authGuard],
  },
];
