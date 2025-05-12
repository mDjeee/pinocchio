import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';


export const spinnerInterceptor: HttpInterceptorFn = (request, next) => {
  const spinnerService = inject(SpinnerService);

  // spinnerService.show();
  return next(request).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};

