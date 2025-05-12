import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const NotAuthorizedGuard: CanActivateFn = (route, state) => {
  // const userService = inject(UserService);
  const router = inject(Router);
  return router.createUrlTree(['auth-layout']);
  // return userService.userLoginData$.pipe(
  //   map((user) => {
  //     const notAuthorized = !!user;
  //     if (notAuthorized) {
  //       return true;
  //     }
  //     return router.createUrlTree(['auth-layout']);
  //   })
  // );
};
