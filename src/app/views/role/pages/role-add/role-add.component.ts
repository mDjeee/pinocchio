import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, RoleEnum } from '../../../../shared/interfaces/role.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service';
import { NgForOf, NgIf } from '@angular/common';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-role-add',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf,
    LocationBackDirective,
    MatProgressSpinner,
    MatError,
    LucideAngularModule,
    MatSuffix,
  ],
  standalone: true,
  templateUrl: './role-add.component.html',
  styleUrl: './role-add.component.scss'
})
export class RoleAddComponent implements OnInit {
  roleForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  id: string | null = null;

  roleTypes = Object.values(RoleEnum);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      type: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.watchRoute();
  }

  watchRoute() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.id;
    this.loadRoleById();
  }

  loadRoleById() {
    if (this.isEditMode && this.id) {
      this.isLoading = true;
      this.roleService.getRoleById(this.id).subscribe({
        next: (role: Role) => {
          this.roleForm.patchValue(role);
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Не удалось загрузить данные роли';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.roleForm.value;

    const operation = this.isEditMode && this.id
      ? this.roleService.updateRole(this.id, formValue)
      : this.roleService.createRole(formValue);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/roles']);
      },
      error: () => {
        this.errorMessage = 'Не удалось сохранить роль';
        this.isLoading = false;
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.roleForm.controls).forEach(control => control.markAsTouched());
  }

  get f() {
    return this.roleForm.controls;
  }
}
