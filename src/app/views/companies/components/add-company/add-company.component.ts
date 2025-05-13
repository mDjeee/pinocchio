import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCompany } from '../../../../shared/interfaces/company.interface';
import { CompanyService } from '../../../../core/services/company.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { InputComponent } from '../../../../shared/components/common/input/input.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { DigitMaskDirective } from '../../../../shared/directives/digit-mask.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ValidationService } from '../../../../core/services/validation.service';

@Component({
  selector: 'app-add-company',
  imports: [
    MatFormFieldModule,
    InputComponent,
    MatSelect,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    DigitMaskDirective,
    LocationBackDirective,
    LucideAngularModule
  ],
  standalone: true,
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  isEditMode = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validationService: ValidationService,
    ) {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, this.validationService.validateUzPhoneNumber]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, this.validationService.validateEmail]],
    });
  }

  ngOnInit() {
    this.watchRoute();
  }

  watchRoute() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(query => {
        if(query['id']) {
          this.id = +query['id'];
          this.isEditMode = true;
          this.getCompanyById();
        }
      });
  }

  getCompanyById() {
    this.companyService.getCompanyById(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.companyForm.patchValue({
            ...res,
          });
        }
      });
  }


  onSubmit() {
    if (this.companyForm.valid) {
      if(this.isEditMode) {
        this.editCompany();
      } else {
        this.createCompany();
      }
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  createCompany() {
    const payload = this.companyForm.getRawValue();
    this.companyService.createCompany(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Компания успешно добавлена!');
          this.router.navigate(['/companies'], {
            queryParamsHandling: 'merge',
          });
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  editCompany() {
    const payload = this.companyForm.getRawValue();
    this.companyService.updateCompany(+this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Компания успешно обновлена!');
          this.router.navigate(['/companies', this.id], {
            queryParams: {
              id: this.id,
              inn: payload.inn
            },
            queryParamsHandling: 'merge',
          });
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  get f() {
    return this.companyForm.controls;
  }
}
