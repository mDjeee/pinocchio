import { IMenu } from '../menu.component';

export const menuList: IMenu[] = [
  {
    title: 'Компании',
    svgName: 'buildings',
    route: '/companies',
    compareQuery: true,
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
