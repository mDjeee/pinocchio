import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const branchColumn: TableColumn[] = [
  { header: 'Наименование', field: 'name' },
  { header: 'Адрес', field: 'address' },
  { header: 'Телефон', field: 'phoneNumber' },
  { header: 'Действия', field: 'actions' },
];
