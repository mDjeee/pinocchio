import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { usersColumns } from '../../../users/constants/users-columns';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../shared/interfaces/user.interface';
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
  users = [];

  constructor(
    private destroyRef: DestroyRef,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getCompanyUsers();
  }

  getCompanyUsers() {
    this.usersService.getCompanyUsers(this.companyId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.users = res.data;
          this.page = res.current_page;
          this.totalItems = res.total;
          this.size = res.per_page;
        }
      })
  }

  detachUser(user: User) {
    // this.usersService.detachUser({user_id: user.id, organization_id: user.org_id})
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe({
    //     next: (res: any) => {
    //       this.toastrService.success('Пользователь успешно откреплён!');
    //       this.getCompanyUsers();
    //     },
    //     error: (err: any) => {
    //       this.toastrService.error(err.message);
    //     }
    //   })
  }

  protected readonly usersColumns = usersColumns;
}
