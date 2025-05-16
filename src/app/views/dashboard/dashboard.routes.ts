import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard.component')
      .then(m => m.DashboardComponent),
    data: {
      background: 'none',
      excludeBorder: true,
      excludeShadow: true,
    }
  }
];
