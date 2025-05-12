import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users.component')
      .then((m) => m.UsersComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/users-list/users-list.component')
          .then((m) => m.UsersListComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./pages/users-create/users-create.component')
          .then((m) => m.UsersCreateComponent),
      },
    ]
  },
];
