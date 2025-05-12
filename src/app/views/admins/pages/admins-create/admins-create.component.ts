import { Component, DestroyRef, OnInit } from '@angular/core';
import { Admin, CreateAdmin } from '../../../../shared/interfaces/admin.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MatIconButton } from '@angular/material/button';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';

@Component({
  selector: 'app-admins-create',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    NgIf,
    LucideAngularModule,
    MatIconButton,
    LocationBackDirective,
    MatSuffix
  ],
  standalone: true,
  templateUrl: './admins-create.component.html',
  styleUrl: './admins-create.component.scss'
})
export class AdminsCreateComponent implements OnInit {
  adminForm: FormGroup;
  hidePassword = true;
  id = '';
  admin?: Admin;

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.adminForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^998\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
          this.getAdminById();
        }
      });
  }

  getAdminById() {
    this.adminService.getAdminById(+this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.admin = res;
          this.adminForm.patchValue({
            ...this.admin
          });
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      if(this.id) {
        this.updateAdmin();
      }
      else {
        this.createAdmin();
      }
    } else {
      this.adminForm.markAllAsTouched();
    }
  }

  createAdmin() {
    const payload: CreateAdmin = this.adminForm.getRawValue();
    this.adminService.createAdmin(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Администратор успешно создан!');
          this.router.navigate(['/admins']);
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  updateAdmin() {
    const payload: CreateAdmin = this.adminForm.getRawValue();
    this.adminService.updateAdmin(+this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Администратор успешно создан!');
          this.router.navigate(['/admins', this.id]);
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  get f() {
    return this.adminForm.controls;
  }
}
