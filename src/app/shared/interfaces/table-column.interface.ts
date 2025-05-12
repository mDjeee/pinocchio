import { TemplateRef } from '@angular/core';

export interface TableColumn {
  header: string;
  field: string;
  template?: TemplateRef<any>;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  total?: boolean;
  percent?: boolean;
  maxWidth?: string;
  breakWords?: boolean;
  datePipe?: string;
}
