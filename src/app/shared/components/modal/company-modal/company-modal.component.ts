import { Component, Inject } from '@angular/core';
import { Organization } from '../../../interfaces/company.interface';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-company-modal',
  imports: [
    MatDialogClose,
    DatePipe,
    MatIcon,
    RouterLink,
    LucideAngularModule
  ],
  standalone: true,
  templateUrl: './company-modal.component.html',
  styleUrl: './company-modal.component.scss'
})
export class CompanyModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public company: Organization,
    public _dialogRef:MatDialogRef<CompanyModalComponent>
  ) {
  }
}
