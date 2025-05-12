import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizationDetail } from '../../../../shared/interfaces/company.interface';
import { UsersService } from '../../../../core/services/users.service';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { LucideAngularModule } from 'lucide-angular';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { User } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-users-create',
  imports: [
    FormsModule,
    LocationBackDirective,
    LucideAngularModule,
    MatError,
    MatFormField,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent implements OnInit {

  userForm: FormGroup;
  organizations: any[] = [];
  hidePassword = true;
  inn = '';
  organizationDetail!: OrganizationDetail;
  id = '';
  user?: User;

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private userService: UsersService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^998\d{9}$/)]],
      org_ids: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.loadOrganizations();
    this.watchRoute();
  }

  watchRoute() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(query => {
        this.inn = query['inn'];
        this.id = query['id'];
        if(this.id) {
          this.getUserById();
        }
        if(this.inn) {
          this.getCompanyByInn();
        }
      });
  }

  getCompanyByInn() {
    this.companyService.getCompanyByInn(this.inn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.organizationDetail = res;
        }
      });
  }

  loadOrganizations() {
    this.companyService.getCompanies({ page: 1, perPage: 100 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.organizations = res.data;
        },
        error: (err) => {
          this.toastrService.error('Не удалось загрузить организации');
        }
      });
  }

  getUserById() {
    this.userService.getUserById(+this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.user = res;
          this.userForm.patchValue({
            ...this.user
          });
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if(this.id) {
        this.updateUser();
      }
      else {
        this.createUser();
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  createUser() {
    const payload = this.userForm.getRawValue();
    this.userService.createUser(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно создан!');
          this.router.navigate(['/users']);
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  updateUser() {
    const payload = this.userForm.getRawValue();
    this.userService.updateUser(+this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно создан!');
          this.router.navigate(['/users']);
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  get f() {
    return this.userForm.controls;
  }
}
