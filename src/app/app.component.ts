import { Component, DestroyRef, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { filter } from 'rxjs';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { GlobalSpinnerComponent } from './core/components/global-spinner/global-spinner.component';
import { MatToolbar } from '@angular/material/toolbar';
import { FontService } from './core/services/font.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerService } from './core/services/spinner.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [
    MenuComponent,
    MatIcon,
    MatIconButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    HeaderComponent,
    NgClass,
    NgStyle,
    GlobalSpinnerComponent,
    MatToolbar,
    AsyncPipe,
    MatProgressSpinner,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MKB Admin';

  constructor(
    private router: Router,
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private fontService: FontService,
    private destroyRef: DestroyRef,
    public spinnerService: SpinnerService,
  ) {

    this.setUserData();
  }

  ngOnInit() {
    this.initFont();
  }

  initFont() {
    const font = localStorage.getItem('font');
    if(font) {
      this.fontService.setFontFamily(font);
    }
  }

  setUserData() {

  }
}
