import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const AuthorizedGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const user = storageService.getToken();
  if(!!user) {
    return true;
  }
  return router.createUrlTree(['auth']);
};
