import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../shared/interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';
import { MatIcon } from '@angular/material/icon';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Organization } from '../../../../shared/interfaces/company.interface';
import { companiesColumns } from '../../../companies/constants/companies-columns';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { CompanyModalComponent } from '../../../../shared/components/modal/company-modal/company-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';

@Component({
  selector: 'app-user-details',
  imports: [
    DatePipe,
    PhoneFormatPipe,
    MatIcon,
    MatDialogClose,
    LucideAngularModule,
    RouterLink,
    TableComponent,
    MatMenu,
    MatMenuItem,
    SvgIconComponent,
    MatMenuTrigger
  ],
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  organizations: Organization[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    public _dialogRef:MatDialogRef<UserDetailsComponent>,
    private usersService: UsersService,
    private destroyRef: DestroyRef,
    private matDialog: MatDialog,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getUserCompaniesById();
  }

  openDetails(company: any) {
    this.matDialog.open(CompanyModalComponent, {
      width: '550px',
      height: '100%',
      position: {right: '0'},
      panelClass: 'right-side-dialog',
      data: company,
    }).afterClosed()
      .subscribe((res) => {
        if(res === 'update') {
        }
      });
  }

  detachUser(org: Organization) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите откерпить организацию ${org.name} от ${this.user.full_name}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.detach(org);
      } else {
        // User cancelled
      }
    });

  }

  detach(org: Organization) {
    this.usersService.detachUser({user_id: this.user.id, organization_id: org.id})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно откреплён!');
          this.getUserCompaniesById();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  getUserCompaniesById() {
    this.usersService.getUserOrganizations(this.user.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Organization[]) => {
          this.organizations = res;
        }
      })
  }

  protected readonly companiesColumns = companiesColumns;
}
