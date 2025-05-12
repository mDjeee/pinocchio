import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TableColumn } from '../../interfaces/table-column.interface';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  DatePipe,
  NgClass,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { getStatusInfo } from '../../../core/services/status-color.service';
import { AmountService } from '../../../core/services/amount.service';
import { LucideAngularModule } from 'lucide-angular';
import { StopPropagationDirective } from '../../directives/stop-propagation.directive';

@Component({
  selector: 'app-table',
  imports: [
    MatCard,
    MatProgressSpinner,
    NgClass,
    MatTable,
    MatSort,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCheckbox,
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    NgStyle,
    DatePipe,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgSwitchDefault,
    NgIf,
    LucideAngularModule,
    StopPropagationDirective
  ],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);
  private _cdRef = inject(ChangeDetectorRef);

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  previousData: any[] = [];
  @Input() loading = false;
  @Output() selectedRows = new EventEmitter<any[]>();
  @Output() unselectedRows = new EventEmitter<any[]>();
  @Output() differenceSelectedRows = new EventEmitter<any[]>();
  @Output() rowClicked = new EventEmitter();
  @Input() custom = false;
  @Input() type = 'PAYMENT_TEMPLATE';
  @Input() actionTemplate!: TemplateRef<any>;
  @Input() additionalTemplate!: TemplateRef<any>;
  @Input() preAdditionalTemplate!: TemplateRef<any>;
  @Input() expandTemplate!: TemplateRef<any>;
  @Input() size = 10;
  @Input() errorMessage = '';
  @Input() numbering = false;
  @Input() isTotal = false;
  @Input() checkTitle = '';
  @Input() secondCheckTitle = '';
  @Input() checkable = false;
  @Input() doubleCheck = false;
  @Input() tableClass = '';
  @Input() spread = false;

  expandedRow: any = null;

  expandedRows: { [key: string]: boolean } = {};

  tableActionBtns!: any;

  constructor(
    public amountService: AmountService,
  ) {
  }

  get displayedColumns() {
    let baseColumns = this.columns.map(c => c.field);
    if(this.doubleCheck) {
      baseColumns = ['doubleSelect', ...baseColumns];
    }
    if(this.checkable) {
      baseColumns = ['select', ...baseColumns];
    }
    if(this.numbering) {
      baseColumns = ['numbering', ...baseColumns];
    }
    if(this.expandTemplate) {
      baseColumns = [...baseColumns, 'expand'];
    }
    return baseColumns;
  }

  isExpandedRow = (index: number, row: any) => {
    return this.expandedRow === row;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getData() {
    return new MatTableDataSource(this.data);
  }

  deepCopy(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Return primitives as-is
    }
    const copied: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copied[key] = this.deepCopy(obj[key]);
      }
    }
    return copied;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'] && changes['data'].currentValue != undefined && changes['data'].currentValue?.length > 0) {
      this.previousData = this.deepCopy(this.data);
    }
  }

  toggleRow(row: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expandedRow = this.expandedRow === row ? null : row;
    this._cdRef.detectChanges();
    // const rowId = row.id || row.applicationId;
    // this.expandedRows[rowId] = !this.expandedRows[rowId];
  }

  isExpanded(element: any) {
    return this.expandedRow === element;
  }

  toggle(element: any) {
    this.expandedRow = this.isExpanded(element) ? null : element;
  }

  toggleSelectAll(event: MatCheckboxChange) {
    this.data.forEach(row => (row.selected = event.checked));
    this.getSelectedRows(event, true);
  }

  someSelected() {
    return this.data.some(row => row.selected);
  }

  isAllChecked() {
    return this.data.every(row => row.selected);
  }

  toggleSecondSelectAll(event: MatCheckboxChange) {
    this.data.forEach(row => (row.doubleCheck = event.checked));
    this.getSelectedRows(event, true);
  }

  someSecondSelected() {
    return this.data.some(row => row.doubleCheck);
  }

  isAllSecondChecked() {
    return this.data.every(row => row.doubleCheck);
  }

  ngOnDestroy() {
    this.selectedRows.emit([]);
  }

  onClickRow(row: any): void {
    this.rowClicked.emit(row);
  }

  getSelectedRows(event: any, skip = false) {
    if(!skip) {
      event.stopPropagation();
    }
    const selectedData = this.data.filter(row => row.selected || row.doubleCheck);
    const unselectedData = this.data.filter(row => !row.selected || !row.doubleCheck);
    const differences = this.calculateDifferences(this.previousData, this.data);

    this.selectedRows.emit(selectedData);
    this.unselectedRows.emit(unselectedData);
    this.differenceSelectedRows.emit(differences);

    return selectedData;
  }

  calculateDifferences(previousData: { id: number, selected: boolean, doubleCheck: boolean }[], currentData: { id: number, selected: boolean, doubleCheck: boolean }[]) {
    const differences: { id: number, previous: boolean, current: boolean, previousSecond: boolean, currentSecond: boolean }[] = [];

    // Create a map for quick lookup of previous data by id
    const previousDataMap = new Map(previousData.map(row => [row.id, row]));

    // Iterate through current data and compare with previous data
    currentData.forEach(currentRow => {
      const previousRow = previousDataMap.get(currentRow.id);
      if (previousRow && (previousRow.selected !== currentRow.selected || (previousRow.doubleCheck !== currentRow.doubleCheck ))) {
        differences.push({
          id: currentRow.id,
          previous: previousRow.selected,
          current: currentRow.selected,
          previousSecond: previousRow.doubleCheck,
          currentSecond: currentRow.doubleCheck,
        });
      }
    });

    return differences;
  }

  isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
  }

  isStatusField(path: string) {
    return path === 'absStatus' || path === 'applicationStatus' || path == 'status';
  }

  statusColors(obj: any, path: string) {
    let data = path.split('.').reduce((o, key) => (o ? o[key] : null), obj);
    return getStatusInfo(data);
  }

  getNestedValue(obj: any, column: any) {
    let path: string = column.field;
    let data = path.split('.').reduce((o, key) => (o ? o[key] : null), obj);
    if (path === 'docDate' || path === 'createdDate') {
      if (data?.length > 11) {
        data = new Date(data).toLocaleDateString('ru-Ru', {day: 'numeric', month: 'numeric', year: 'numeric'})
      }
    }
    if(data === '') return '';
    if(path.includes('percent')) {
      return `${data}%`;
    }
    if (path === 'balance' || path == 'saldoUnlead.amount') {
      data = this.convertBalanceToNumber(obj);
    }

    if(
      path === 'amount'
    ) {
      data = this.amountService.convertToAmount(+data);
    }

    if(column.spread) {
      data = data.toString();
    }
    return data;
  }


  convertBalanceToNumber(balance: any): string {
    const integerPart = this.separateNumberByThree(Math.floor(balance.balance?.amount / 100));
    const fractionalPart = `${Math.abs(balance.balance?.amount % 100)}`.padStart(2, '0');
    return `${integerPart},${fractionalPart}`;
  }

  separateNumberByThree(value: string | number): string {
    const strValue = value.toString();

    return strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
