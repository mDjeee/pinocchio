import { HttpInterceptorFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

interface SuccessResponseBody {
  success: true;
  data: any;
}

interface ErrorResponseBody {
  success: false;
  err: {
    message: string;
    code: number;
    [key: string]: any;
  };
}

type ResponseBody = SuccessResponseBody | ErrorResponseBody;

export const responseInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    map((event: HttpEvent<unknown>) => {
      // Only handle HttpResponse events
      if (!(event instanceof HttpResponse)) {
        return event;
      }

      const response = event as HttpResponse<ResponseBody>;

      // Check if body exists and has the expected structure
      if (response.body && typeof response.body === 'object' && 'success' in response.body) {
        if (response.body.success) {
          // For successful responses, return the data part
          return response.clone({
            body: (response.body as any).result.data
          });
        } else {
          console.log('res', response);
          // For error responses, throw the error or a default one
          const error = (response.body as any).error ?? {
            message: (response.body as any)?.result?.message || 'Неизвестная ошибка',
            code: -1
          };
          throw error;
        }
      }

      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      const errorObj = error.error?.error ?? {
        message: error.message || 'Неизвестная ошибка',
        code: error.status || -1
      };

      // Re-throw the error to be caught by the subscriber's error handler
      return throwError(() => errorObj);
    })
  );
};
