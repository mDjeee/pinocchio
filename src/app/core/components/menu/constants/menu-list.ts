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
    title: 'Клиенты',
    lucideIcon: 'users',
    route: '/clients'
  },
  {
    title: 'Тарифы',
    lucideIcon: 'banknote',
    route: '/tariff'
  },
];
