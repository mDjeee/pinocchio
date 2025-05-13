import { Routes } from '@angular/router';

export const clientRoutes: Routes = [
  {
    path: 'clients',
    loadComponent: () => import('./client.component').then(m => m.ClientComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/client-list/client-list.component')
          .then(m => m.ClientListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/client-add/client-add.component')
          .then(m => m.ClientAddComponent),
      },
    ]
  }
]
