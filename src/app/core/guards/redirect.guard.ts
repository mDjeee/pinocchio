import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const RedirectGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  return router.createUrlTree(['companies']);
}
