import { IMenu } from '../menu.component';

export const menuList: IMenu[] = [
  {
    title: 'Компании',
    lucideIcon: 'building-2',
    route: '/companies',
  },
  {
    title: 'Администраторы',
    lucideIcon: 'shield-user',
    route: '/admins'
  },
  {
    title: 'Пользователи',
    lucideIcon: 'users',
    route: '/users'
  },
];
