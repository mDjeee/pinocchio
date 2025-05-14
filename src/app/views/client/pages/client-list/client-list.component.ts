import { Component, DestroyRef, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tariff } from '../../../../shared/interfaces/tariff.interface';
import { ClientService } from '../../../../core/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { clientColumn } from '../../constants/client-column';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import { Client } from '../../../../shared/interfaces/client.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { CompanyUserService } from '../../../../core/services/company-user.service';
import { StorageService } from '../../../../core/services/storage.service';
import { LoginResponse } from '../../../../shared/interfaces/login-response.interface';
import { companyUserColumn } from '../../../company-user/constants/company-user.column';

@Component({
  selector: 'app-client-list',
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
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  title = 'Клиенты';
  clients: User[] = [];
  page = 0;
  size = 20;
  totalItems = 0;
  user!: LoginResponse;

  constructor(
    private destryoRef: DestroyRef,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.getClients();
  }

  getUser() {
    this.user = this.storageService.getUserDetail();
  }

  getClients() {
    this.companyUserService.getCompanyUsers(this.user.companyUserResponse.company.id, true)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.clients = res;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getClients();
  }

  protected readonly companyUserColumn = companyUserColumn;
}
