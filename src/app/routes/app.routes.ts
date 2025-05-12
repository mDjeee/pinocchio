import { Routes } from '@angular/router';
import { authRoutes } from './auth.routes';
import { viewRoutes } from './view.routes';
import { AuthorizedGuard } from '../core/guards/authorized.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('../layouts/auth-layout/auth-layout.component')
      .then((m) => m.AuthLayoutComponent),
    children: authRoutes
  },
  {
    path: 'logout',
    loadComponent: () => import('../views/logout/logout.component').then((m) => m.LogoutComponent),
  },
  {
    path: '',
    loadComponent: () => import('../layouts/default-layout/default-layout.component')
      .then(m => m.DefaultLayoutComponent),
    children: viewRoutes,
    canActivate: [AuthorizedGuard]
  },
];
