import { Component, DestroyRef, OnInit } from '@angular/core';
import { Tariff } from '../../../../shared/interfaces/tariff.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { roleColumn } from '../../constants/role-colmun';
import { RoleService } from '../../../../core/services/role.service';
import { Role } from '../../../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-list',
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
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit {
  title = 'Роли';
  roles: Role[] = [];
  page = 0;
  size = 20;
  totalItems = 0;

  constructor(
    private destryoRef: DestroyRef,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getTariffs()
  }

  getTariffs() {
    this.roleService.getRoles()
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.roles = res;
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
    this.roleService.deleteRole(tariff.id)
  }

  protected readonly roleColumn = roleColumn;
}
