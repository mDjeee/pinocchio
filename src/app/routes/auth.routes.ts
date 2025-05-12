import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../views/auth/auth.component')
      .then((m) => m.AuthComponent),
    children: []
  },
]
