import { IMenu } from '../menu.component';
import { viewsEnum } from '../../../../shared/interfaces/views.enum';

export const menuList: IMenu[] = [
  {
    title: 'Дэшбоард',
    lucideIcon: 'gauge',
    route: '/dashboard',
    canActivate: [viewsEnum.COMPANY_USER_STATISTICS, viewsEnum.STATISTICS],
  },
  {
    title: 'Компании',
    lucideIcon: 'building-2',
    route: '/companies',
    canActivate: [viewsEnum.COMPANIES],
  },
  {
    title: 'Пользователи',
    lucideIcon: 'shield-user',
    route: '/users',
    canActivate: [viewsEnum.USERS],
  },
  {
    title: 'Пользователи компании',
    lucideIcon: 'shield-user',
    route: '/company-users',
    canActivate: [viewsEnum.COMPANY_USERS],
  },
  {
    title: 'Клиенты',
    lucideIcon: 'users',
    route: '/clients',
    canActivate: [viewsEnum.COMPANY_CLIENTS],
  },
  {
    title: 'Тарифы',
    lucideIcon: 'banknote',
    route: '/tariff',
    canActivate: [viewsEnum.TARIFFS],
  },
  {
    title: 'Подписки',
    lucideIcon: 'hand-coins',
    route: '/subscriptions',
    canActivate: [viewsEnum.COMPANY_USER_STATISTICS],
  },
  {
    title: 'Тарифы компании',
    lucideIcon: 'layout-list',
    route: '/company-tariff',
    canActivate: [viewsEnum.COMPANY_USER_TARIFFS],
  },
  {
    title: 'Филиал',
    lucideIcon: 'building-2',
    route: '/branch',
    canActivate: [viewsEnum.COMPANY_USER_STATISTICS],
  },
  // {
  //   title: 'Роли',
  //   lucideIcon: 'shield-check',
  //   route: '/role'
  // },
];
