import { Component, DestroyRef, OnInit } from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterLink } from '@angular/router';
import { adminColumns } from '../../constants/admin-columns';
import { AdminService } from '../../../../core/services/admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Admin, CreateAdmin } from '../../../../shared/interfaces/admin.interface';
import { ToastrService } from 'ngx-toastr';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../shared/interfaces/user.interface';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admins-list',
  imports: [
    PaginatorComponent,
    TableComponent,
    RouterLink,
    MatMenu,
    SvgIconComponent,
    MatMenuTrigger,
    LucideAngularModule,
    MatMenuItem
  ],
  standalone: true,
  templateUrl: './admins-list.component.html',
  styleUrl: './admins-list.component.scss'
})
export class AdminsListComponent implements OnInit {
  title = 'Администраторы';
  page = 0;
  size = 10;
  totalItems = 0;
  admins: Admin[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private adminsService: AdminService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getAdmins();
  }

  getAdmins() {
    this.adminsService.getAdmins()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.admins = res.data;
          this.page = res.current_page;
          this.totalItems = res.total;
          this.size = res.per_page;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  openDetails(admin: any) {}

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getAdmins();
  }

  deleteAdmin(admin: Admin) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить администратора ${admin.full_name || ''}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(admin);
      } else {
        // User cancelled
      }
    });
  }

  delete(admin: Admin) {
    this.adminsService.deleteAdmin(admin.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Администратор успешно удалён!');
          this.getAdmins();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  protected readonly adminColumns = adminColumns;
}
