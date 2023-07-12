import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const adminAuthGuard = (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.roleCheck() == 'ADMIN' ? true : router.parseUrl('/auth/login');
};

export const userAuthGuard = (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.roleCheck() ? 'USER' : router.parseUrl('/auth/login');
};
