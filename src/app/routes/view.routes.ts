import { Routes } from '@angular/router';
import { companiesRoutes } from '../views/companies/companies.routes';
import { adminsRoute } from '../views/admins/admins.route';
import { usersRoutes } from '../views/users/users.routes';
import { RedirectGuard } from '../core/guards/redirect.guard';

export const viewRoutes: Routes = [
  {
    path: '',
    canActivate: [RedirectGuard],
    children: [],
  },
  ...companiesRoutes,
  ...adminsRoute,
  ...usersRoutes,
  {
    path: '**',
    loadComponent: () => import('../views/not-found-page/not-found-page.component')
      .then(m => m.NotFoundPageComponent),
  }
]
