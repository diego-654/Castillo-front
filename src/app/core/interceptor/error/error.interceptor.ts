import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { customCatchError } from '@core/operators/customCatchError';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // if (error.status === 401) {
      //   authService.logout();
      // }
      return throwError(() => error);
    }),
    customCatchError()
  );
};
