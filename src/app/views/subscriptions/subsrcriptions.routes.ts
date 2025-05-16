import { Routes } from '@angular/router';

export const subscriptionsRoutes: Routes = [
  {
    path: 'subscriptions',
    loadComponent: () => import('./subscriptions.component')
      .then(m => m.SubscriptionsComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/subscriptions-list/subscriptions-list.component')
          .then(m => m.SubscriptionsListComponent),
      }
    ]
  }
]
