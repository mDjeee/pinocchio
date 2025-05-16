import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SvgIconComponent } from '../../../shared/components/common/svg-icon/svg-icon.component';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { LoginResponse } from '../../../shared/interfaces/login-response.interface';

@Component({
  selector: 'app-header-nav',
  imports: [
    LucideAngularModule,
    SvgIconComponent,
    RouterLink
  ],
  standalone: true,
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavComponent implements OnInit {
  userDetail!: LoginResponse;

  constructor(
    private storageService: StorageService,
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getUserDetail()
  }

  getUserDetail() {
    this.userDetail = this.storageService.getUserDetail();
    this._cdRef.detectChanges();
  }
}
