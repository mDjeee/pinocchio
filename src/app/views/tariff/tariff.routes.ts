import { Routes } from '@angular/router';

export const tariffRoutes: Routes = [
  {
    path: 'tariff',
    loadComponent: () => import('./tariff.component').then(m => m.TariffComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/tariff-list/tariff-list.component')
          .then(m => m.TariffListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/tariff-add/tariff-add.component')
          .then(m => m.TariffAddComponent),
      },
    ]
  }
]
