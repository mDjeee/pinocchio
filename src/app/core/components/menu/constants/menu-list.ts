import { IMenu } from '../menu.component';

export const menuList: IMenu[] = [
  {
    title: 'Компании',
    lucideIcon: 'building-2',
    route: '/companies',
  },
  {
    title: 'Пользователи',
    lucideIcon: 'shield-user',
    route: '/users'
  },
  {
    title: 'Пользователи компании',
    lucideIcon: 'shield-user',
    route: '/company-users'
  },
  {
    title: 'Клиенты',
    lucideIcon: 'users',
    route: '/clients'
  },
  {
    title: 'Тарифы',
    lucideIcon: 'banknote',
    route: '/tariff'
  },
  {
    title: 'Тарифы компании',
    lucideIcon: 'layout-list',
    route: '/company-tariff'
  },
  // {
  //   title: 'Роли',
  //   lucideIcon: 'shield-check',
  //   route: '/role'
  // },
];
