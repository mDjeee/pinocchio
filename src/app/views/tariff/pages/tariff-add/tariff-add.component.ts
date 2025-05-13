import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TariffService } from '../../../../core/services/tariff.service';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tariff-add',
  imports: [
    LocationBackDirective,
    NgIf,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    MatSlideToggle
  ],
  standalone: true,
  templateUrl: './tariff-add.component.html',
  styleUrl: './tariff-add.component.scss'
})
export class TariffAddComponent implements OnInit {

  tariffForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tariffService: TariffService
  ) {
    this.tariffForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(500)],
      isActive: [true],
      periodMonth: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.id;

    if (this.isEditMode && this.id) {
      this.isLoading = true;
      this.tariffService.getTariffById(this.id).subscribe({
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
      ? this.tariffService.updateTariff(this.id, formValue)
      : this.tariffService.createTariff(formValue);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/tariffs']);
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

  get name() { return this.tariffForm.get('name'); }
  get price() { return this.tariffForm.get('price'); }
  get description() { return this.tariffForm.get('description'); }
  get periodMonth() { return this.tariffForm.get('periodMonth'); }
}
