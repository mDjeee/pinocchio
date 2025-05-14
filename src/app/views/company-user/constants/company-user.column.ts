import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const companyUserColumn: TableColumn[] = [
  { header: 'Имя', field: 'userInfo.firstName' },
  { header: 'Фамилия', field: 'userInfo.lastName' },
  { header: 'Телефон', field: 'userInfo.phoneNumber' },
  { header: 'Почта', field: 'userInfo.email' },
  { header: 'Действия', field: 'actions', center: true },
];
