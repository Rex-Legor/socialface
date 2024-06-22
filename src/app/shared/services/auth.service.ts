import { Injectable } from '@angular/core';
import {
  IAuth,
  IAuthErrorResponse,
  IAuthSuccessResponse,
} from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: IAuth) {
    return this.httpClient.post<IAuthSuccessResponse>(
      '/auth/login',
      credentials,
    );
  }

  signup(email: string) {
    return this.httpClient.post<string>('/auth/signup', { email });
  }

  resetPassword(email: string) {
    return this.httpClient.post<string>('/auth/reset-password', { email });
  }
}
