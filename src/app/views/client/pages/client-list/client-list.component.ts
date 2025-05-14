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
import { AgreeModalComponent } from '../../../../shared/components/modal/agree-modal/agree-modal.component';
import { Client } from '../../../../shared/interfaces/client.interface';
import { User } from '../../../../shared/interfaces/user.interface';

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
  clients: User[] = [];
  page = 0;
  size = 20;
  totalItems = 0;

  constructor(
    private destryoRef: DestroyRef,
    private clientService: ClientService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getClients()
  }

  getClients() {
    this.clientService.getClients()
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

  deleteClient(client: Client) {
    const dialogRef = this.matDialog.open(AgreeModalComponent, {
      data: {
        title: `Вы точно хотите удалить клиента ${client.id || ''}?`,
        confirm: 'Да',
        cancel: 'Нет'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.delete(client);
      } else {
        // User cancelled
      }
    });
  }

  delete(client: Client) {
    this.clientService.deleteClient(client.id)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe({
        next: (res: any) => {
          this.toastrService.success('Клиент успешно удалён');
          this.getClients();
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      });
  }

  protected readonly clientColumn = clientColumn;
}
