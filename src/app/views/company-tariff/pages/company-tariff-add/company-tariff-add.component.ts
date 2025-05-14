import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TariffService } from '../../../../core/services/tariff.service';
import { CompanyTariffService } from '../../../../core/services/company-tariff.service';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';
import { SpinProcessComponent } from '../../../../shared/components/spin-process/spin-process.component';

@Component({
  selector: 'app-company-tariff-add',
  imports: [
    LocationBackDirective,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    MatSlideToggle,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    SpinProcessComponent
  ],
  standalone: true,
  templateUrl: './company-tariff-add.component.html',
  styleUrl: './company-tariff-add.component.scss'
})
export class CompanyTariffAddComponent implements OnInit {
  tariffForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyTariffService: CompanyTariffService
  ) {
    this.tariffForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(200)],
      isActive: [true],
      periodDays: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.id;

    if (this.isEditMode && this.id) {
      this.isLoading = true;
      this.companyTariffService.getTariffById(this.id).subscribe({
        next: (tariff) => {
          this.tariffForm.patchValue(tariff);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load tariff data';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.tariffForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.tariffForm.value;

    const operation = this.isEditMode && this.id
      ? this.companyTariffService.updateTariff(this.id, formValue)
      : this.companyTariffService.createTariff(formValue);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/tariff']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to save tariff';
        this.isLoading = false;
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.tariffForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get f() {
    return this.tariffForm.controls;
  }
}
