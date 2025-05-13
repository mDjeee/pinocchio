import { Routes } from '@angular/router';

export const roleRoutes: Routes = [
  {
    path: 'role',
    loadComponent: () => import('./role.component').then(m => m.RoleComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/role-list/role-list.component')
          .then(m => m.RoleListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/role-add/role-add.component')
          .then(m => m.RoleAddComponent),
      },
    ]
  }
]
