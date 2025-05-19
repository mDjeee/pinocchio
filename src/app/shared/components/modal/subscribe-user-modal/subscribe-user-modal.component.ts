import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompanyUser } from '../../../interfaces/company-user.interface';
import { CompanyTariffService } from '../../../../core/services/company-tariff.service';
import { CompanyTariff } from '../../../interfaces/company-tariff.interface';
import { LucideAngularModule } from 'lucide-angular';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { SpinProcessComponent } from '../../spin-process/spin-process.component';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../interfaces/branch.interface';

@Component({
  selector: 'app-subscribe-user-modal',
  imports: [
    LucideAngularModule,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    NgClass,
    SpinProcessComponent
  ],
  standalone: true,
  templateUrl: './subscribe-user-modal.component.html',
  styleUrl: './subscribe-user-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeUserModalComponent implements OnInit {
  tariffs: CompanyTariff[] = [];
  subForm: FormGroup;
  loading = false;
  bracnhes: Branch[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: CompanyUser,
    private destroyRef: DestroyRef,
    private subscriptionService: SubscriptionService,
    private companyTariffService: CompanyTariffService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<SubscribeUserModalComponent>,
    private branchService: BranchService,
    private _cdRef: ChangeDetectorRef,
  ) {
    this.subForm = this.fb.group({
      companyId: [this.user.company.id, [Validators.required]],
      tariffId: [null, [Validators.required]],
      userId: [this.user.userInfo.id, [Validators.required]],
      branchId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getTariffs();
    this.getBranches();
  }

  getBranches() {
    this.branchService.getBranches(this.user.company.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.bracnhes = res;
          if(this.bracnhes.length === 1) {
            this.subForm.patchValue({
              branchId: this.bracnhes[0].id,
            });
            this._cdRef.markForCheck();
          }
        }
      });
  }

  getTariffs() {
    this.companyTariffService.getTariffs()
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
    this.subscriptionService.subscribeUser(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Подписка успешно создана!');
          this.matDialogRef.close('update');
          this.loading = false;
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
          this.loading = false;
        }
      })
  }
}
