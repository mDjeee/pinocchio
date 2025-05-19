import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService } from '../../../../core/services/branch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { SpinProcessComponent } from '../../../../shared/components/spin-process/spin-process.component';
import { StorageService } from '../../../../core/services/storage.service';
import { LoginResponse } from '../../../../shared/interfaces/login-response.interface';
import { DigitMaskDirective } from '../../../../shared/directives/digit-mask.directive';
import { ValidationService } from '../../../../core/services/validation.service';

@Component({
  selector: 'app-branch-add',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    LocationBackDirective,
    SpinProcessComponent,
    DigitMaskDirective
  ],
  standalone: true,
  templateUrl: './branch-add.component.html',
  styleUrl: './branch-add.component.scss'
})
export class BranchAddComponent implements OnInit {
  branchForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  id: string | null = null;
  user!: LoginResponse;

  constructor(
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private storageService: StorageService,
    private validationService: ValidationService,
  ) {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(12), this.validationService.validateUzPhoneNumber]],
      companyId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.user = this.storageService.getUserDetail();
    this.updateForm();
    this.watchEdit();
  }

  updateForm() {
    this.branchForm.patchValue({
      companyId: this.user.companyUserResponse.company.id,
    })
  }

  watchEdit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.isEditMode = !!this.id;

    if (this.isEditMode && this.id) {
      this.isLoading = true;
      this.branchService.getBranch(+this.id, this.user.companyUserResponse.company.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (branch) => {
            this.branchForm.patchValue(branch);
            this.isLoading = false;
          },
          error: () => {
            this.errorMessage = 'Не удалось загрузить данные филиала';
            this.isLoading = false;
          }
        });
    }
  }

  onSubmit(): void {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.branchForm.value;

    const request = this.isEditMode && this.id
      ? this.branchService.updateBranch(+this.id, formValue)
      : this.branchService.createBranch(formValue);

    request
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: () => this.router.navigate(['/branch']),
      error: () => {
        this.errorMessage = 'Не удалось сохранить данные';
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.branchForm.controls;
  }
}
