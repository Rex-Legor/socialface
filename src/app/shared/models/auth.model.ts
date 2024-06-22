import { IUser } from './user.model';

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthSuccessResponse {
  user: IUser;
}

export interface IAuthErrorResponse {
  message: string;
}
