import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const subsColumn: TableColumn[] = [
  { header: 'Наименование', field: 'tariff.name' },
  { header: 'Описание', field: 'tariff.description' },
  { header: 'Цена', field: 'tariff.price' },
  { header: 'Период', field: 'tariff.periodMonth' },
  { header: 'Срок', field: 'expiredAt' },
  { header: 'Активный', field: 'tariff.isActive' },
];
