import { Component } from '@angular/core';
import { GlobalSpinnerComponent } from '../../core/components/global-spinner/global-spinner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

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
    NgClass
  ],
  standalone: true,
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
}
