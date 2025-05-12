import { Routes } from '@angular/router';

export const adminsRoute: Routes = [
  {
    path: 'admins',
    loadComponent: () => import('./admins.component')
      .then(m => m.AdminsComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admins-list/admins-list.component')
          .then(m => m.AdminsListComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./pages/admins-create/admins-create.component')
          .then(m => m.AdminsCreateComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/admin-detail/admin-detail.component')
          .then(m => m.AdminDetailComponent),
      },
    ]
  }
];
