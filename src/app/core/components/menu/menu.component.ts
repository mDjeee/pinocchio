import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { expandCollapse } from '../../../shared/animations/expand-menu.animation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { menuList } from './constants/menu-list';
import { SvgIconComponent } from '../../../shared/components/common/svg-icon/svg-icon.component';
import { MenuItemComponent } from '../../../shared/components/menu-item/menu-item.component';
import { slideInOutAnimation } from '../../../shared/animations/slide-in-out.animation';
import { LucideAngularModule } from 'lucide-angular';
import { viewsEnum } from '../../../shared/interfaces/views.enum';
import { LoginResponse } from '../../../shared/interfaces/login-response.interface';
import { StorageService } from '../../services/storage.service';

export interface IMenu {
  title: string;
  route: string;
  svgName?: string;
  lucideIcon?: string;
  svgColor?: string;
  query?: any;
  canActivate?: viewsEnum[];
  compareQuery?: boolean;
  children?: {
    title: string;
    svgName: string;
    svgColor?: string;
    route: string;
    query?: any;
  }[]
}

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatSidenavContent,
    MatIconButton,
    MatSidenavContainer,
    MatSidenav,
    NgClass,
    NgIf,
    MatListItem,
    NgForOf,
    MatList,
    MatDivider,
    SvgIconComponent,
    MenuItemComponent,
    LucideAngularModule,
  ],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() isMenuOpen = true;
  expandedMenuItems: Record<string, boolean> = {};
  url = '';
  user!: LoginResponse;

  menuItems: IMenu[] = menuList;

  trackByFn(index: number): any {
    return index;
  };

  constructor(
    private _cdRef: ChangeDetectorRef,
    private router: Router,
    private destroyRef: DestroyRef,
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.user = this.storageService.getUserDetail();
    this.watchMenuExpand();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isMenuOpen'] && changes['isMenuOpen'].currentValue != undefined) {
      this._cdRef.detectChanges();
    }
  }

  checkHasPermission(viewEnums?: viewsEnum[]): boolean {
    if(!viewEnums) return  true;
    if(!viewEnums?.length) return true;
    const hasViews = this.user?.windows || [];
    return <boolean>viewEnums?.some((view: any) => hasViews.includes(view));
  }

  watchMenuExpand() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.url = val.url;
      }
    });

    const storedExpandedMenuItems = localStorage.getItem('expandedMenuItems');
    if (storedExpandedMenuItems) {
      this.expandedMenuItems = JSON.parse(storedExpandedMenuItems);
    }
  }
}
