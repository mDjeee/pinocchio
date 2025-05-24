import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import {
  MatDatepickerToggle, MatDatepickerToggleIcon,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SubscriptionsFilterCompany } from '../../../../shared/interfaces/subscribe.interface';
import { StorageService } from '../../../../core/services/storage.service';
import { LoginResponse } from '../../../../shared/interfaces/login-response.interface';
import { NgForOf } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { UsersService } from '../../../../core/services/users.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-subscriptions-filter',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatSelect,
    MatOption,
    MatLabel,
    MatStartDate,
    MatEndDate,
    NgForOf,
    LucideAngularModule,
    MatDatepickerToggleIcon,
    MatSuffix,
  ],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './subscriptions-filter.component.html',
  styleUrl: './subscriptions-filter.component.scss'
})
export class SubscriptionsFilterComponent implements OnInit {
  @Input() companies: { id: number, name: string }[] = [];
  @Input() users: { id: number, name: string }[] = [];

  @Output() filterApplied = new EventEmitter<SubscriptionsFilterComponent>();

  filterForm: FormGroup;
  user!: LoginResponse;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private userService: UsersService,
    ) {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 7);

    this.filterForm = this.fb.group({
      dateFrom: [start],
      dateTo: [today],
      companyId: [null],
      userId: [null]
    });
  }

  ngOnInit() {
    this.user = this.storageService.getUserDetail();

    this.filterForm.patchValue({
      companyId: this.user.companyUserResponse.company.id
    });
  }

  getUsers() {
    this.userService.getUsers();
  }

  applyFilter() {
    if (this.filterForm.valid) {
      const payload: any = this.filterForm.getRawValue();
      payload.dateFrom = payload.dateFrom.toISOString();
      payload.dateTo = payload.dateTo.toISOString();
      this.filterApplied.emit(payload);
    }
  }
}
