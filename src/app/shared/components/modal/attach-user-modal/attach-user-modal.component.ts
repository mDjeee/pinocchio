import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { CompanyService } from '../../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/user.interface';
import { LocationBackDirective } from '../../../directives/location-back.directive';
import { LucideAngularModule } from 'lucide-angular';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { CompanyUserService } from '../../../../core/services/company-user.service';

@Component({
  selector: 'app-attach-user-modal',
  imports: [
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
    MatDialogClose
  ],
  standalone: true,
  templateUrl: './attach-user-modal.component.html',
  styleUrl: './attach-user-modal.component.scss'
})
export class AttachUserModalComponent implements OnInit {
  userForm: FormGroup;
  organizations: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private companyUserService: CompanyUserService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<AttachUserModalComponent>,
  ) {
    this.userForm = this.fb.group({
      userId: [this.user.id, [Validators.required]],
      companyId: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.companyService.getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.organizations = res;
        },
        error: (err) => {
          this.toastrService.error('Не удалось загрузить организации');
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
