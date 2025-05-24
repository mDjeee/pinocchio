import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyRoleEnum, RoleEnum } from '../../../../shared/interfaces/role.interface';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DigitMaskDirective } from '../../../../shared/directives/digit-mask.directive';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { LucideAngularModule } from 'lucide-angular';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgClass, NgIf } from '@angular/common';
import { CompanyUserService } from '../../../../core/services/company-user.service';
import { CompanyUser } from '../../../../shared/interfaces/company-user.interface';
import { LoginResponse } from '../../../../shared/interfaces/login-response.interface';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-company-user-add',
  imports: [
    DigitMaskDirective,
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
    ReactiveFormsModule,
    NgClass
  ],
  standalone: true,
  templateUrl: './company-user-add.component.html',
  styleUrl: './company-user-add.component.scss'
})
export class CompanyUserAddComponent implements OnInit {
  userForm: FormGroup;
  organizations: any[] = [];
  hidePassword = true;
  inn = '';
  id = '';
  user?: CompanyUser;
  currentUser!: LoginResponse;

  roleTypes = Object.values(CompanyRoleEnum);

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private companyUserService: CompanyUserService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validationService: ValidationService,
    private storageService: StorageService,
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, this.validationService.validateUzPhoneNumber]],
      email: ['', [Validators.required, this.validationService.validateEmail]],
      role: ['', [Validators.required]],
      companyId: [null, [Validators.required]],
      status: ['ACTIVE', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.watchRoute();
    this.getCompanies();
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.currentUser = this.storageService.getUserDetail();
    this.userForm.patchValue({
      companyId: this.currentUser.companyUserResponse.company.id
    });
  }

  getCompanies() {
    this.companyService.getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.organizations = res;
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      })
  }

  watchRoute() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(query => {
        this.id = query['id'];
        if(this.id) {
          this.getUserById();
        }
      });
  }

  getUserById() {
    this.companyUserService.getCompanyUserById(+this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.user = res;
          this.userForm.patchValue({
            ...this.user,
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
    this.companyUserService.addCompanyUser(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно создан!');
          this.router.navigate(['/company-users']);
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  updateUser() {
    // const payload = this.userForm.getRawValue();
    // this.companyUserService.updateUser(+this.id, payload)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe({
    //     next: (res: any) => {
    //       this.toastrService.success('Пользователь успешно создан!');
    //       this.router.navigate(['/users']);
    //     },
    //     error: (err: any) => {
    //       this.toastrService.error(err.message);
    //     }
    //   });
  }

  get f() {
    return this.userForm.controls;
  }
}
