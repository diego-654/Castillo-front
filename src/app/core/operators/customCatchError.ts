import { NotFoundError, ServerError } from '@core/errors/errors';
import { catchError, OperatorFunction, throwError } from 'rxjs';

export function customCatchError<T>(
  defaultMessage: string = 'Ocurrió un error inesperado.'
): OperatorFunction<T, T> {
  return catchError((error) => {
    const errorMessage = error?.error?.message ?? defaultMessage;

    if (error?.error?.status === 404) {
      return throwError(() => new NotFoundError(errorMessage));
    }

    if (error?.error?.status === 500) {
      return throwError(() => new ServerError(errorMessage));
    }

    return throwError(() => new Error(errorMessage));
  });
}
