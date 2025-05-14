import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Organization } from '../../../interfaces/company.interface';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { TariffService } from '../../../../core/services/tariff.service';
import { Tariff } from '../../../interfaces/tariff.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { LucideAngularModule } from 'lucide-angular';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass, NgIf } from '@angular/common';
import { LocationBackDirective } from '../../../directives/location-back.directive';

@Component({
  selector: 'app-subscribe-company-modal',
  imports: [
    LucideAngularModule,
    MatDialogClose,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf,
    NgClass,
    LocationBackDirective,
    MatSuffix
  ],
  standalone: true,
  templateUrl: './subscribe-company-modal.component.html',
  styleUrl: './subscribe-company-modal.component.scss'
})
export class SubscribeCompanyModalComponent implements OnInit {
  tariffs: Tariff[] = [];
  subForm: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public company: Organization,
    private destroyRef: DestroyRef,
    private subscriptionService: SubscriptionService,
    private tariffService: TariffService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<SubscribeCompanyModalComponent>
  ) {
    this.subForm = this.fb.group({
      companyId: [this.company.id, [Validators.required]],
      tariffId: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getTariffs();
  }

  getTariffs() {
    this.tariffService.getTariffs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.tariffs = res;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  onSubmit() {
    if(this.subForm.invalid) {
      this.subForm.markAllAsTouched();
    } else {
      this.createSubscription();
    }
  }

  createSubscription() {
    this.loading = true;
    const payload = this.subForm.getRawValue();
    this.subscriptionService.subscribeCompany(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Подписка успешно создана!');
          this.matDialogRef.close('update');
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        },
        complete: () => {
          this.loading = false;
        }
      })
  }
}
