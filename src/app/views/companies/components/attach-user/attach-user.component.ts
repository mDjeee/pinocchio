import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { DigitMaskDirective } from '../../../../shared/directives/digit-mask.directive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { LucideAngularModule } from 'lucide-angular';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgIf, Location } from '@angular/common';
import { UsersService } from '../../../../core/services/users.service';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrganizationDetail } from '../../../../shared/interfaces/company.interface';
import { CompanyUserService } from '../../../../core/services/company-user.service';
import { RoleEnum } from '../../../../shared/interfaces/role.interface';

@Component({
  selector: 'app-attach-user-modal',
  imports: [
    DigitMaskDirective,
    FormsModule,
    LocationBackDirective,
    LucideAngularModule,
    MatError,
    MatFormField,
    MatIcon,
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
  templateUrl: './attach-user.component.html',
  styleUrl: './attach-user.component.scss'
})
export class AttachUserComponent implements OnInit {
  userForm: FormGroup;
  organizations: any[] = [];
  hidePassword = true;
  companyId?: number;
  orgDetail?: OrganizationDetail;
  inn = '';
  roleGroup = Object.values(RoleEnum);

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private userService: UsersService,
    private companyUserService: CompanyUserService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _cdRef: ChangeDetectorRef,
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^998\d{9}$/)]],
      companyId: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [null, [Validators.required]],
      status: ['ACTIVE'],
    });
  }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    this.companyService.getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          console.log('res', res);
          this.organizations = res;
          this._cdRef.detectChanges();
        }
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.createUser();
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
          this.location.back();
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
