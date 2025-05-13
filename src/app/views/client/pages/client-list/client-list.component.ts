import { Component, DestroyRef, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tariff } from '../../../../shared/interfaces/tariff.interface';
import { ClientService } from '../../../../core/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { clientColumn } from '../../constants/client-column';

@Component({
  selector: 'app-client-list',
  imports: [
    LucideAngularModule,
    MatMenu,
    MatMenuItem,
    PaginatorComponent,
    TableComponent,
    RouterLink,
    MatMenuTrigger
  ],
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  title = 'Клиенты';
  clients: Tariff[] = [];
  page = 0;
  size = 20;
  totalItems = 0;

  constructor(
    private destryoRef: DestroyRef,
    private cleintService: ClientService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getClients()
  }

  getClients() {
    this.cleintService.getClients()
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
  }

  pageChange(event: any) {
    this.page = event.page;
    this.size = event.size;
    this.getClients();
  }

  deleteClients(tariff: Tariff) {
    this.cleintService.deleteClient(tariff.id)
  }

  protected readonly clientColumn = clientColumn;
}
