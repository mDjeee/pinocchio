import { Routes } from '@angular/router';
import { companiesRoutes } from '../views/companies/companies.routes';
import { adminsRoute } from '../views/admins/admins.route';
import { usersRoutes } from '../views/users/users.routes';
import { RedirectGuard } from '../core/guards/redirect.guard';
import { tariffRoutes } from '../views/tariff/tariff.routes';
import { clientRoutes } from '../views/client/client.routes';
import { roleRoutes } from '../views/role/role.routes';
import { companyTariffRoutes } from '../views/company-tariff/company-tariff.routes';

export const viewRoutes: Routes = [
  {
    path: '',
    canActivate: [RedirectGuard],
    children: [],
  },
  ...companiesRoutes,
  ...adminsRoute,
  ...usersRoutes,
  ...tariffRoutes,
  ...companyTariffRoutes,
  ...clientRoutes,
  ...roleRoutes,
  {
    path: '**',
    loadComponent: () => import('../views/not-found-page/not-found-page.component')
      .then(m => m.NotFoundPageComponent),
  }
]
