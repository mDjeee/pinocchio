import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (request, next) => {
  const clonedRequest = request.clone({
    setHeaders: {
      'X-Lang': 'RU'
    }
  });
  return next(clonedRequest);
  return next(request);
};
