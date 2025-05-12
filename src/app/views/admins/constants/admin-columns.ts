import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const adminColumns: TableColumn[] = [
  { header: 'Имя', field: 'full_name' },
  { header: 'Телефон', field: 'phone' },
  { header: 'Почта', field: 'email' },
  { header: 'Действия', field: 'actions' },
]
