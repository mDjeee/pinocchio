import { Routes } from '@angular/router';

export const companyTariffRoutes: Routes = [
  {
    path: 'company-tariff',
    loadComponent: () => import('./company-tariff.component')
      .then(m => m.CompanyTariffComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/company-tariff-list/company-tariff-list.component')
          .then(m => m.CompanyTariffListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/company-tariff-add/company-tariff-add.component')
          .then(m => m.CompanyTariffAddComponent),
      },
    ]
  }
];
