import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBadge } from '@angular/material/badge';
import { HeaderNavComponent } from '../header-nav/header-nav.component';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatSidenav,
    MatSlideToggle,
    ReactiveFormsModule,
    MatToolbar,
    AsyncPipe,
    RouterLink,
    MatBadge,
    NgOptimizedImage,
    HeaderNavComponent,
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  user!: any;

  unreadMessages = 0;

  @Output() onMenu = new EventEmitter();

  constructor(
    public themeService: ThemeService,
    private destroyRef: DestroyRef,
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.themeService.initTheme();
    this.getMode();
  }

  getMode() {
    this.themeService.mode$.subscribe(val => this.isDarkMode = val);
  }

  getUser() {
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode(this.isDarkMode);
  }

  toggleMenu() {
    this.onMenu.emit();
  }
}
