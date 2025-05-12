import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-global-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './global-spinner.component.html',
  styleUrls: ['./global-spinner.component.scss'],
})
export class GlobalSpinnerComponent {
  get isLoading$() {
    return this.spinnerService.isLoading$;
  }

  constructor(private spinnerService: SpinnerService) {}
}
