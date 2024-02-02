import { CanActivateFn, Router } from '@angular/router';
import { Role } from './role';
import { AuthService } from './services/auth';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userRole: Role = inject(AuthService).getUserRole();

  const expectedRoles: Role[] = route.data['roles']
  const hasRole: boolean = expectedRoles.some((role) => userRole === role);

  return hasRole || router.navigate(['unauthorized']);
};
