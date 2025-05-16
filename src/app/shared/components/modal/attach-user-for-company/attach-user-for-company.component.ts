import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/user.interface';
import { CompanyUserService } from '../../../../core/services/company-user.service';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersService } from '../../../../core/services/users.service';
import { LucideAngularModule } from 'lucide-angular';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { Organization } from '../../../interfaces/company.interface';

@Component({
  selector: 'app-attach-user-for-company',
  imports: [
    FormsModule,
    LucideAngularModule,
    MatDialogClose,
    MatError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './attach-user-for-company.component.html',
  styleUrl: './attach-user-for-company.component.scss'
})
export class AttachUserForCompanyComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public company: Organization,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private companyUserService: CompanyUserService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<AttachUserForCompanyComponent>,
    private userService: UsersService,
  ) {
    this.userForm = this.fb.group({
      userId: [null, [Validators.required]],
      companyId: [this.company.id, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.users = res;
        },
        error: (err) => {
          this.toastrService.error('Не удалось загрузить пользователей');
        }
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.attachUser();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  attachUser() {
    const payload = this.userForm.getRawValue();
    this.companyUserService.attachUser(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно прикреплён!');
          this.matDialogRef.close('update');
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
