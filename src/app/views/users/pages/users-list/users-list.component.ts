import { Component, DestroyRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { RouterLink } from '@angular/router';
import { usersColumns } from '../../constants/users-columns';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { User } from '../../../../shared/interfaces/user.interface';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import {
  AttachUserModalComponent
} from '../../../../shared/components/modal/attach-user-modal/attach-user-modal.component';

@Component({
  selector: 'app-users-list',
  imports: [
    PaginatorComponent,
    TableComponent,
    RouterLink,
    LucideAngularModule,
    MatDialogClose,
    MatMenu,
    MatMenuItem,
    SvgIconComponent,
    MatMenuTrigger
  ],
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  title = 'Пользователи';
  page = 0;
  size = 10;
  totalItems = 0;
  users = [];

  constructor(
    private destroyRef: DestroyRef,
    private toastrService: ToastrService,
    private usersService: UsersService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.users = res.data;
          this.page = res.current_page;
          this.totalItems = res.total;
          this.size = res.per_page;
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

  deleteUser(user: User) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить пользователя ${user.full_name}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(user);
      } else {
        // User cancelled
      }
    });
  }

  delete(user: User) {
    this.usersService.deleteUser(user.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно удалён!');
          this.getUsers();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
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

  protected readonly usersColumns = usersColumns;
}
