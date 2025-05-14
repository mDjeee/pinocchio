import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../shared/interfaces/user.interface';
import { CompanyUserService } from '../../../../core/services/company-user.service';
import { CompanyUser } from '../../../../shared/interfaces/company-user.interface';
import { companyUserColumn } from '../../../company-user/constants/company-user.column';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-companies-users',
  imports: [
    TableComponent,
    PaginatorComponent,
    RouterLink,
    MatMenu,
    SvgIconComponent,
    MatMenuTrigger,
    LucideAngularModule
  ],
  standalone: true,
  templateUrl: './companies-users.component.html',
  styleUrl: './companies-users.component.scss'
})
export class CompaniesUsersComponent implements OnInit {
  @Input() companyId!: number;
  page = 0;
  size = 10;
  totalItems = 0;
  users: CompanyUser[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getCompanyUsers();
  }

  getCompanyUsers() {
    this.companyUserService.getCompanyUsers(this.companyId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.users = res;
        }
      });
  }

  detach(user: CompanyUser) {
    this.companyUserService.detachUser(
      {
        userId: user.userInfo.id,
        companyId: user.company.id,
      }
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно откреплён!');
          this.getCompanyUsers();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  detachUser(user: CompanyUser) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите открепить пользователя ${user.userInfo.firstName} ${user.userInfo.lastName}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.detach(user);
      } else {
        // User cancelled
      }
    });

  }

  protected readonly companyUserColumn = companyUserColumn;
}
