import { Routes } from '@angular/router';

export const companiesRoutes: Routes = [
  {
    path: 'companies',
    loadComponent: () => import('./companies.component')
      .then((m) => m.CompaniesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/companies-list/companies-list.component')
          .then(m => m.CompaniesListComponent)
      },
      {
        path: ':id/add-user',
        loadComponent: () => import('./components/attach-user/attach-user.component')
          .then((m) => m.AttachUserComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./components/add-company/add-company.component')
          .then((m) => m.AddCompanyComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./components/companies-details/companies-details.component')
          .then(m => m.CompaniesDetailsComponent)
      },
    ]
  },
]
