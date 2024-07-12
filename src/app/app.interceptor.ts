import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from './evironment/environment.dev';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({ url: `${environment.API_URL}${req.url}` });
  return next(reqClone);
};
