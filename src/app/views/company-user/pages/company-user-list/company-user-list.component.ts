import { Component, DestroyRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDetailsComponent } from '../../../users/components/user-details/user-details.component';
import { User } from '../../../../shared/interfaces/user.interface';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import {
  AttachUserModalComponent
} from '../../../../shared/components/modal/attach-user-modal/attach-user-modal.component';
import { CompanyUser } from '../../../../shared/interfaces/company-user.interface';
import { CompanyUserService } from '../../../../core/services/company-user.service';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { companyUserColumn } from '../../constants/company-user.column';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-user-list',
  imports: [
    LucideAngularModule,
    MatDialogClose,
    MatMenu,
    MatMenuItem,
    PaginatorComponent,
    TableComponent,
    MatMenuTrigger,
    RouterLink
  ],
  standalone: true,
  templateUrl: './company-user-list.component.html',
  styleUrl: './company-user-list.component.scss'
})
export class CompanyUserListComponent implements OnInit {
  title = 'Пользователи';
  page = 0;
  size = 10;
  totalItems = 0;
  users: CompanyUser[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private toastrService: ToastrService,
    private companyUserService: CompanyUserService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.companyUserService.getCompanyUsers(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.users = res;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  openDetails(user: any) {
    const dialogRef = this.matDialog.open(UserDetailsComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '550px',
      position: {right: '0'},
      panelClass: 'right-side-dialog',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edit') {
        // Handle edit action
      }
    });
  }

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getUsers();
  }

  attachUser(user: User) {
    const dialog = this.matDialog
      .open(AttachUserModalComponent, {
        data: user,
        width: '550px'
      });

    dialog.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        if(value === 'update') {
          this.getUsers();
        }
      })
  }

  protected readonly companyUserColumn = companyUserColumn;
}
