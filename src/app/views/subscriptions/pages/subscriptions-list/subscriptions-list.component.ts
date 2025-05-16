import { Component, DestroyRef, OnInit } from '@angular/core';
import { TariffService } from '../../../../core/services/tariff.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { Subscriptions } from '../../../../shared/interfaces/subscribe.interface';
import { subsColumn } from '../../constants/subs-column';
import { SubscriptionsFilterComponent } from '../../components/subscriptions-filter/subscriptions-filter.component';

@Component({
  selector: 'app-subscriptions-list',
  imports: [
    LucideAngularModule,
    MatMenu,
    MatMenuItem,
    PaginatorComponent,
    TableComponent,
    SubscriptionsFilterComponent
  ],
  standalone: true,
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.scss'
})
export class SubscriptionsListComponent implements OnInit {
  title = 'Подписки';
  subscriptions: Subscriptions[] = [];
  page = 0;
  size = 20;
  totalItems = 0;
  filter: any;

  constructor(
    private destryoRef: DestroyRef,
    private tariffService: TariffService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private subscriptionsService: SubscriptionService,
  ) {
  }

  ngOnInit() {
  }

  updateFilter(filter: any) {
    this.filter = filter;
    this.getSubs(filter);
  }

  getSubs(filter: any) {
    this.subscriptionsService.getSubscriptionsCompany(filter)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.subscriptions = res;
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getSubs(this.filter);
  }

  protected readonly subsColumn = subsColumn;
}
