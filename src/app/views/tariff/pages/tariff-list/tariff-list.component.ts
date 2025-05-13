import { Component, DestroyRef, OnInit } from '@angular/core';
import { Organization } from '../../../../shared/interfaces/company.interface';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tariff } from '../../../../shared/interfaces/tariff.interface';
import { TariffService } from '../../../../core/services/tariff.service';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { tariffColumn } from '../../constants/tariff-column';
import { Role } from '../../../../shared/interfaces/role.interface';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';

@Component({
  selector: 'app-tariff-list',
  imports: [
    LucideAngularModule,
    MatMenu,
    MatMenuItem,
    PaginatorComponent,
    TableComponent,
    RouterLink,
    MatMenuTrigger
  ],
  standalone: true,
  templateUrl: './tariff-list.component.html',
  styleUrl: './tariff-list.component.scss'
})
export class TariffListComponent implements OnInit {
  title = 'Тарифы';
  tariffs: Tariff[] = [];
  page = 0;
  size = 20;
  totalItems = 0;

  constructor(
    private destryoRef: DestroyRef,
    private tariffService: TariffService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getTariffs()
  }

  getTariffs() {
    this.tariffService.getTariffs()
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.tariffs = res;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getTariffs();
  }

  deleteTariff(tariff: Tariff) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить тариф ${tariff.name || ''}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(tariff);
      } else {
        // User cancelled
      }
    });
  }

  delete(tariff: Tariff) {
    this.tariffService.deleteTariff(tariff.id)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Тариф успешно удалён');
          this.getTariffs();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  protected readonly tariffColumn = tariffColumn;
}
