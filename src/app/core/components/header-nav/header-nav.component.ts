import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SvgIconComponent } from '../../../shared/components/common/svg-icon/svg-icon.component';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header-nav',
  imports: [
    LucideAngularModule,
    SvgIconComponent,
    RouterLink
  ],
  standalone: true,
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss'
})
export class HeaderNavComponent implements OnInit {
  userDetail: any;

  constructor(
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.getUserDetail()
  }

  getUserDetail() {
    this.userDetail = this.storageService.getUserDetail();
  }
}
