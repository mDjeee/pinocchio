import { Component, DestroyRef, OnInit } from '@angular/core';
import { GlobalSpinnerComponent } from '../../core/components/global-spinner/global-spinner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  imports: [
    GlobalSpinnerComponent,
    HeaderComponent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MenuComponent,
    RouterOutlet,
    NgClass,
    NgStyle
  ],
  standalone: true,
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent implements OnInit {
  routeData?: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.updateRouteData(this.activatedRoute);
    this.getRouteData();
  }

  getRouteData() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
        )
      .subscribe(event => {
        this.updateRouteData(this.activatedRoute);
      });
  }

  private updateRouteData(route: ActivatedRoute) {
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    currentRoute.data.subscribe((data) => {
      this.routeData = data;
    });
  }
}
