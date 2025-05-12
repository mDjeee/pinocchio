import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const companiesColumns: TableColumn[] = [
  { header: 'Наименование', field: 'name' },
  { header: 'Номер телефона', field: 'phoneNumber' },
  { header: 'Почта', field: 'email' },
  { header: 'Действия', field: 'actions', center: true },
];
