import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const usersColumns: TableColumn[] = [
  { header: 'Имя', field: 'full_name' },
  { header: 'Телефон', field: 'phone' },
  { header: 'Действия', field: 'actions', center: true },
];
