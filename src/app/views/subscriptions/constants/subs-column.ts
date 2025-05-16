import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const subsColumn: TableColumn[] = [
  { header: 'Наименование', field: 'name' },
  { header: 'Описание', field: 'description' },
  { header: 'Цена', field: 'price' },
  { header: 'Период', field: 'periodMonth' },
  { header: 'Активный', field: 'isActive' },
];
