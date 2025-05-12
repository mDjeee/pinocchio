import { IMenu } from '../menu.component';

export const menuList: IMenu[] = [
  {
    title: 'Дистрибьютор',
    svgName: 'buildings',
    route: '/companies',
    query: {
      type: 'distributor'
    },
    compareQuery: true,
  },
  {
    title: 'Дилер',
    svgName: 'building-4',
    route: '/companies',
    query: {
      type: 'dealer'
    },
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
