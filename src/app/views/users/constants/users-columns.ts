import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const usersColumns: TableColumn[] = [
  { header: 'Имя', field: 'firstName' },
  { header: 'Фамилия', field: 'lastName' },
  { header: 'Почта', field: 'email' },
  { header: 'Телефон', field: 'phoneNumber' },
  { header: 'Действия', field: 'actions', center: true },
];
