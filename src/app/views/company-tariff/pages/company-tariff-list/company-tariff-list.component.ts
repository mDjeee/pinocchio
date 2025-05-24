import { Component, DestroyRef, OnInit } from '@angular/core';
import { Tariff } from '../../../../shared/interfaces/tariff.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import { CompanyTariffService } from '../../../../core/services/company-tariff.service';
import { CompanyTariff } from '../../../../shared/interfaces/company-tariff.interface';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { companyTariffColumn } from '../../constants/company-tariff.column';
import { LoginResponse } from '../../../../shared/interfaces/login-response.interface';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-company-tariff-list',
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
  templateUrl: './company-tariff-list.component.html',
  styleUrl: './company-tariff-list.component.scss',
})
export class CompanyTariffListComponent implements OnInit {
  title = 'Тарифы компании';
  tariffs: CompanyTariff[] = [];
  page = 0;
  size = 20;
  totalItems = 0;
  currentUser!: LoginResponse;

  constructor(
    private destryoRef: DestroyRef,
    private companyTariffService: CompanyTariffService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.storageService.getUserDetail();
    this.getTariffs();
  }

  getTariffs() {
    this.companyTariffService.getTariffs(this.currentUser.companyUserResponse.company.id)
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
    this.companyTariffService.deleteTariff(tariff.id)
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

  protected readonly companyTariffColumn = companyTariffColumn;
}
