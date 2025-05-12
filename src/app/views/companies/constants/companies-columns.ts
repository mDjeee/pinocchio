import { TableColumn } from '../../../shared/interfaces/table-column.interface';

export const companiesColumns: TableColumn[] = [
  { header: 'ИНН', field: 'inn' },
  { header: 'Наименование', field: 'name' },
  { header: 'Внешний ID', field: 'ext_org_id' },
  { header: 'Тип', field: 'additionalTemplate' },
  { header: 'Действия', field: 'actions', center: true },
];
