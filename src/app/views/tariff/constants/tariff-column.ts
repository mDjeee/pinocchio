import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const tariffColumn: TableColumn[] = [
  { header: 'Наименование', field: 'name' },
  { header: 'Период', field: 'periodMonth' },
  { header: 'Цена', field: 'price' },
  { header: 'Действия', field: 'actions', center: true },
];
