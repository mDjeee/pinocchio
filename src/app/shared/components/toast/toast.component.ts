import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { toastAnimation } from '../../animations/toast.animation';
import { MatIcon } from '@angular/material/icon';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIcon, LucideAngularModule],
  templateUrl: './toast.component.html',
  styles: [
    `
      :host {
        display: block;
        padding: 0 !important;
        border:none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastAnimation],
  preserveWhitespaces: false,
})
export class ToastComponent extends Toast {
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
