import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { SvgIconComponent } from '../common/svg-icon/svg-icon.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule } from 'lucide-angular';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-menu-item',
  imports: [
    SvgIconComponent,
    RouterLink,
    NgIf,
    AsyncPipe,
    NgClass,
    LucideAngularModule,
    MatIconButton
  ],
  standalone: true,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  animations: slideInOutAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent implements OnInit {
  @Input() svgName? = 'receipt-item';
  @Input() svgColor = '#38AA3D';
  @Input() lucideIcon? = '';
  @Input() title = 'Title';
  @Input() route = '';
  @Input() query: any = {};
  @Input() isMenuOpen = true;
  @Input() compareQuery?: boolean = false;

  isActive = false;

  constructor(
    private destroyRef: DestroyRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    ) {
  }

  ngOnInit() {
    this.updateActiveState();

    // Subscribe to router events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((value) => {
        this.updateActiveState();
      });

    this.watchQuery();
  }

  watchQuery() {
    if(this.compareQuery) {
      this.activatedRoute.queryParams
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(query => {
          this.updateActiveState();
        })
    }
  }

  updateActiveState() {
    if (!this.route) {
      this.isActive = false;
      return;
    }

    const isRouteActive = this.router.isActive(this.route, {
      paths: 'subset',
      queryParams: 'subset',  // Changed from 'exact' to 'subset' to be more flexible
      fragment: 'ignored',
      matrixParams: 'ignored'
    });

    const currentQueryParams = this.activatedRoute.snapshot.queryParams;

    let areQueryParamsActive = true;

    if (this.compareQuery) {
      const queryKeys = Object.keys(this.query);
      const currentKeys = Object.keys(currentQueryParams);

      if (queryKeys.some(key => !currentKeys.includes(key))) {
        areQueryParamsActive = false;
      } else {
        for (const key of queryKeys) {
          if (this.query[key] !== currentQueryParams[key]) {
            areQueryParamsActive = false;
            break;
          }
        }
      }
    }

    this.isActive = isRouteActive && areQueryParamsActive;
    this._cdRef.markForCheck();
  }
}
