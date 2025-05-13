import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Tariff } from '../../shared/interfaces/tariff.interface';
import { TariffService } from '../../core/services/tariff.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-client',
  imports: [
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
}
