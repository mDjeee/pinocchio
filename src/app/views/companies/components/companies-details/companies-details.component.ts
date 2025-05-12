import { Component, DestroyRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Organization, OrganizationDetail } from '../../../../shared/interfaces/company.interface';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { SvgIconComponent } from '../../../../shared/components/common/svg-icon/svg-icon.component';
import { CompaniesUsersComponent } from '../companies-users/companies-users.component';

@Component({
  selector: 'app-companies-details',
  imports: [
    DatePipe,
    MatDialogClose,
    MatIcon,
    LocationBackDirective,
    SvgIconComponent,
    CompaniesUsersComponent,
    RouterLink
  ],
  standalone: true,
  templateUrl: './companies-details.component.html',
  styleUrl: './companies-details.component.scss'
})
export class CompaniesDetailsComponent implements OnInit {
  organization?: Organization;
  company?: OrganizationDetail;
  inn?: string;
  id?: number;

  constructor(
    private destroyRef: DestroyRef,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.watchRoute();
  }

  watchRoute() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        this.id = +param['id'];
        if(this.id) {
          this.getOrganization();
        }
      });


    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        this.inn = param['inn'];
        this.getCompanyByInn();
      });
  }

  getCompanyByInn() {
    if(this.inn) {
      this.companyService.getCompanyByInn(this.inn)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res: any) => {
            this.company = res;
          },
          error: (err) => {
            this.toastrService.error(err.message);
          }
        });
    }
  }

  getOrganization() {
    if(this.id) {
      this.companyService.getCompanyById(this.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res: any) => {
            this.organization = res;
          }
        });
    }
  }
}
