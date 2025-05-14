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
import { NgClass, NgIf } from '@angular/common';
import { User } from '../../../../shared/interfaces/user.interface';
import { ValidationService } from '../../../../core/services/validation.service';
import { DigitMaskDirective } from '../../../../shared/directives/digit-mask.directive';
import { RoleEnum } from '../../../../shared/interfaces/role.interface';

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
    ReactiveFormsModule,
    DigitMaskDirective,
    NgClass
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

  roleTypes = Object.values(RoleEnum);

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private userService: UsersService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validationService: ValidationService,
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, this.validationService.validateUzPhoneNumber]],
      email: ['', [Validators.required, this.validationService.validateEmail]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.watchRoute();
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
    this.userService.getUserById(+this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
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
