import { Injectable } from '@angular/core';
import {
  IAuth,
  IAuthErrorResponse,
  IAuthSuccessResponse,
} from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { IUser } from '../models/user.model';

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
    return this.httpClient.post<IAuthSuccessResponse>('/auth/signup', {
      email,
    });
  }

  resetPassword(email: string) {
    return this.httpClient.post<string>('/auth/reset-password', { email });
  }

  updateUser(user: IUser) {
    return this.httpClient.put<void>(
      '/api/user/update',
      { user },
      { params: { id: user.id } },
    );
  }
}
