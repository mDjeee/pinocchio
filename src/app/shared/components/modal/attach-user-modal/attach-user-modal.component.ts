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
    private userService: UsersService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<AttachUserModalComponent>,
  ) {
    this.userForm = this.fb.group({
      org_ids: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadOrganizations();
  }

  getUserById() {
    this.userService.getUserById(this.user.id)
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

  loadOrganizations() {
    this.companyService.getCompanies({ page: 1, perPage: 100 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.organizations = res.data;
          this.getUserById();
        },
        error: (err) => {
          this.toastrService.error('Не удалось загрузить организации');
        }
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.updateUser();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  updateUser() {
    const payload = this.userForm.getRawValue();
    this.userService.updateUser(this.user.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Пользователь успешно имзенён!');
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
