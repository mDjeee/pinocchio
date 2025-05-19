import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const companyTariffColumn: TableColumn[] = [
  { header: 'Наименование', field: 'name' },
  { header: 'Период', field: 'periodDays' },
  { header: 'Цена', field: 'price' },
  { header: 'Действия', field: 'actions', center: true },
];
