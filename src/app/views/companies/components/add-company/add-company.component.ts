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
  type = 'distributor';

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      inn: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      nibbd: ['', [Validators.pattern(/^\d{8}$/)]],
      ext_org_id: ['', [Validators.required]],
      client_uid: ['', [Validators.required]],
      pinfl: ['', [Validators.pattern(/^\d{14}$/)]],
      type: [{value: 'distributor', disabled: true}, [Validators.required]]
    });
  }

  ngOnInit() {
    this.watchInn();
    this.watchRoute();
    this.watchType();
  }

  watchRoute() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(query => {
        if(query['type']) {
          this.type = query['type'];

          this.companyForm.patchValue({
            type: this.type
          })
        }
        if(query['id']) {
          this.id = +query['id'];
          this.isEditMode = true;
          this.getCompanyById();
        }
      });
  }

  watchType() {
    this.companyForm.get('type')
      ?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(type => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { type: type || 'distributor' },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      });
  }

  getCompanyById() {
    this.companyService.getCompanyById(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.companyForm.patchValue({
            ...res,
            client_uid: res.clientUid,
            ext_org_id: res.ext_org_id,
            nibbd: res.clientCode,
          });
        }
      });
  }

  watchInn() {
    this.companyForm.get('inn')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(innValue => {
      if (innValue && innValue.length === 9) {
        this.companyService.getCompanyByInn(`${innValue}`).subscribe({
          next: (res: any) => {
            this.companyForm.patchValue({
              name: res.name,
              address: res.address,
              client_uid: res.clientUid,
              ext_org_id: res.ext_org_id,
              nibbd: res.clientCode,
            });
          }
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
