import { Injectable } from '@angular/core';
import {
  IAuth,
  IAuthErrorResponse,
  IAuthSuccessResponse,
} from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { IUser } from '../models/user.model';

/**
 * Service for making api calls for authentication.
 * @author Ricardo Legorreta Mendoza
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Makes POST api call to /auth/login.
   * @param credentials
   * @returns
   */
  login(credentials: IAuth) {
    return this.httpClient.post<IAuthSuccessResponse>(
      '/auth/login',
      credentials,
    );
  }

  /**
   * Makes POST api call to /auth/signup.
   * @param email
   * @returns
   */
  signup(email: string) {
    return this.httpClient.post<IAuthSuccessResponse>('/auth/signup', {
      email,
    });
  }

  /**
   * Makes POST api call to /auth/reset-password.
   * @param email
   * @returns
   */
  resetPassword(email: string) {
    return this.httpClient.post<string>('/auth/reset-password', { email });
  }

  /**
   * Makes PUT api call to /api/user/update
   * @param user
   * @returns
   */
  updateUser(user: IUser) {
    return this.httpClient.put<void>(
      '/api/user/update',
      { user },
      { params: { id: user.id } },
    );
  }
}
