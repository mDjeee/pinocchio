import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../services/storage.service';

export const sessionInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const toastrService = inject(ToastrService);
  const storage = inject(StorageService);

  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401 && !request.url.includes('login')) {
        storage.removeToken();
        toastrService.error('Вы не авторизованы. Пожалуйста, войдите в систему.');
        router.navigate(['/logout']);
      }
      return throwError(() => error);
    })
  );
};
