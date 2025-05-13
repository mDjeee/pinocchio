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
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';

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
    this.getRoles()
  }

  getRoles() {
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
    this.getRoles();
  }

  deleteRole(role: Role) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить роль ${role.name || ''}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(role);
      } else {
        // User cancelled
      }
    });
  }

  delete(role: Role) {
    this.roleService.deleteRole(role.id)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Роль успешно удалён');
          this.getRoles();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  protected readonly roleColumn = roleColumn;
}
