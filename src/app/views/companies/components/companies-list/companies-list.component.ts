import { Component, DestroyRef, OnInit } from '@angular/core';
import { Organization } from '../../../../shared/interfaces/company.interface';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompanyModalComponent } from '../../../../shared/components/modal/company-modal/company-modal.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { companiesColumns } from '../../constants/companies-columns';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { LucideAngularModule } from 'lucide-angular';
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';

@Component({
  selector: 'app-companies-list',
  imports: [
    RouterLink,
    TableComponent,
    PaginatorComponent,
    MatMenuTrigger,
    SvgIconComponent,
    MatMenu,
    LucideAngularModule,
    MatMenuItem
  ],
  standalone: true,
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss'
})
export class CompaniesListComponent implements OnInit {
  title = 'Дистрибьютор';
  data = [];
  companies: Organization[] = [];
  page = 0;
  size = 20;
  totalItems = 0;
  type = 'distributor';

  constructor(
    private destryoRef: DestroyRef,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.watchRoute();
  }

  watchRoute() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destryoRef))
        .subscribe(query => {
          if(query['type']) {
            this.type = query['type'];
            this.title = this.type === 'distributor' ? 'Дистрибьютор' : 'Дилер';
          }
          this.getCompanies();
        })
  }

  getCompanies() {
    this.companyService.getCompanies(
      { page: this.page, perPage: this.size },
      { type: this.type }
      )
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.companies = res.data;
          this.page = res.current_page - 1;
          this.totalItems = res.total;
          this.size = res.per_page;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
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

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getCompanies();
  }

  deleteOrg(org: Organization) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить организацию ${org.name}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(org);
      } else {
        // User cancelled
      }
    });
  }

  delete(org: Organization) {
    this.companyService.deleteCompany(org.id)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success(`Организация ${org.name} успешно удалена!`);
          this.getCompanies();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      })
  }

  protected readonly companiesColumns = companiesColumns;
}
