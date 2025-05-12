import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agree-modal',
  imports: [
    MatDialogClose
  ],
  standalone: true,
  templateUrl: './agree-modal.component.html',
  styleUrl: './agree-modal.component.scss'
})
export class AgreeModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, confirm: string, cancel: string },
    private matDialogRef: MatDialogRef<AgreeModalComponent>
  ) {
  }

  onConfirm() {
    this.matDialogRef.close('confirm');
  }
}
