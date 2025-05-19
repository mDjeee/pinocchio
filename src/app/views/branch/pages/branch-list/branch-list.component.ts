import { Component, DestroyRef, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { branchColumn } from '../../constants/branch-column';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import { Branch } from '../../../../shared/interfaces/branch.interface';
import { BranchService } from '../../../../core/services/branch.service';
import { LoginResponse } from '../../../../shared/interfaces/login-response.interface';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-branch-list',
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
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.scss'
})
export class BranchListComponent implements OnInit {
  title = 'Филиалы';
  branches: Branch[] = [];
  page = 0;
  size = 20;
  totalItems = 0;
  user!: LoginResponse;

  constructor(
    private destryoRef: DestroyRef,
    private branchService: BranchService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.user = this.storageService.getUserDetail();
    this.getBranches()
  }

  getBranches() {
    this.branchService.getBranches(this.user.companyUserResponse.company.id)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.branches = res;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getBranches();
  }

  deleteBranch(branch: Branch) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить филиал ${branch.name || ''}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(branch);
      } else {
        // User cancelled
      }
    });
  }

  delete(branch: Branch) {
    this.branchService.deleteBranch(branch.id)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Филиал успешно удалён');
          this.getBranches();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  protected readonly branchColumn = branchColumn;
}
