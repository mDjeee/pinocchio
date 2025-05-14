import { Routes } from '@angular/router';

export const companyUserRoutes: Routes = [
  {
    path: 'company-users',
    loadComponent: () => import('./company-user.component')
      .then(m => m.CompanyUserComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/company-user-list/company-user-list.component')
          .then(m => m.CompanyUserListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/company-user-add/company-user-add.component')
          .then(m => m.CompanyUserAddComponent),
      },
    ]
  }
];
