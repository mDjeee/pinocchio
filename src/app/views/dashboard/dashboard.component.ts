import { Component, DestroyRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DateTypeEnum, Statistics, StatisticsFilter } from '../../shared/interfaces/statistics.interface';
import { StatsComponent } from './components/stats/stats.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  MatDatepickerToggle, MatDatepickerToggleIcon,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatIconButton } from '@angular/material/button';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { StatisticsService } from '../../core/services/statistics.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../core/services/storage.service';
import { LoginResponse } from '../../shared/interfaces/login-response.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatsComponent,
    BarChartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    ReactiveFormsModule,
    MatCheckbox,
    MatFormField,
    MatSelect,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatLabel,
    MatOption,
    MatStartDate,
    MatEndDate,
    LucideAngularModule,
    MatSuffix,
    MatIconButton,
    MatDatepickerToggleIcon,
    PieChartComponent,
  ],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  filterForm: FormGroup;
  dateProps = Object.values(DateTypeEnum);
  user!: LoginResponse;
  mockStats: Statistics[] = [];

  summaryStats: {
    allUserCount: number;
    newMembers: number;
    activeMembers: number;
    churnCount: number;
    allAmount: number;
    amount: number;
  } = {
    allUserCount: 0,
    newMembers: 0,
    activeMembers: 0,
    churnCount: 0,
    allAmount: 0,
    amount: 0,
  };

  chartData: {
    users: number[];
    active: number[];
    labels: string[];
    ratios: number[];
    amounts: number[];
    newUsers: number[];
  } = {
    users: [],
    active: [],
    labels: [],
    ratios: [],
    amounts: [],
    newUsers: [],
  };

  constructor(
    private fb: FormBuilder,
    private statisticsService: StatisticsService,
    private destroyRef: DestroyRef,
    private toastrService: ToastrService,
    private storageService: StorageService,
    ) {
    Chart.register(...registerables, ChartDataLabels);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    this.filterForm = this.fb.group({
      companyId: [1],
      dateFrom: [yesterday],
      dateTo: [today],
      isDaily: [DateTypeEnum.DAILY],
      byBranch: [false]
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.loadStatistics();
  }

  loadUserData() {
    this.user = this.storageService.getUserDetail();
  }

  applyFilter() {
    this.loadStatistics();
  }

  loadStatistics() {
    const rawValue = this.filterForm.value;

    const filter: StatisticsFilter = {
      companyId: rawValue.companyId,
      dateFrom: rawValue.dateFrom,
      dateTo: rawValue.dateTo,
      isDaily: rawValue.isDaily,
      byBranch: rawValue.byBranch
    };

    this.statisticsService.getStatistics(this.user.companyUserResponse.company.id, filter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          console.log('res', res);
          this.mockStats = res;
          this.convertData(this.mockStats);
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  convertData(mockStats: Statistics[]) {
    this.summaryStats = {
      allUserCount: mockStats.reduce((a, b) => a + b.allUserCount, 0),
      newMembers: mockStats.reduce((a, b) => a + b.newMembers, 0),
      activeMembers: mockStats.reduce((a, b) => a + b.activeMembers, 0),
      churnCount: mockStats.reduce((a, b) => a + b.churnCount, 0),
      allAmount: mockStats.reduce((a, b) => a + b.allAmount, 0),
      amount: mockStats.reduce((a, b) => a + b.amount, 0),
    };

    this.chartData.users = mockStats.map(s => s.allUserCount);
    this.chartData.active = mockStats.map(s => s.activeMembers);
    this.chartData.labels = mockStats.map(s => s.date);
    this.chartData.amounts = mockStats.map(s => s.amount);
    this.chartData.ratios = [
      this.summaryStats.activeMembers,
      this.summaryStats.churnCount
    ]
    this.chartData.newUsers = [
      this.summaryStats.allUserCount,
      this.summaryStats.newMembers
    ];
  }

  loadMockDate() {
    const rawValue = this.filterForm.value;

    const filter: StatisticsFilter = {
      companyId: rawValue.companyId,
      dateFrom: rawValue.dateFrom,
      dateTo: rawValue.dateTo,
      isDaily: rawValue.isDaily,
      byBranch: rawValue.byBranch
    };

    const mockStats: Statistics[] = [
      { companyId: filter.companyId, date: '2025-01-01', allUserCount: 100, newMembers: 10, activeMembers: 80, churnCount: 5, branchName: 'Main', allAmount: 100000, amount: 100, },
      { companyId: filter.companyId, date: '2025-01-02', allUserCount: 110, newMembers: 15, activeMembers: 85, churnCount: 3, branchName: 'Main', allAmount: 100000, amount: 100, }
    ];

    this.convertData(mockStats);
  }

  protected readonly DateTypeEnum = DateTypeEnum;
}
