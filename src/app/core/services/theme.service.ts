import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  public palettes = [
    { title: 'Азурный', value: 'azure-light', color: '#87CEEB', icon: 'light_mode' },
    { title: 'Азурный', value: 'azure-dark', color: '#4682B4', icon: 'dark_mode' },
    { title: 'Красный', value: 'red-light', color: '#FF6F61', icon: 'light_mode' },
    { title: 'Красный', value: 'red-dark', color: '#B22222', icon: 'dark_mode' },
    { title: 'Зелёный', value: 'green-light', color: '#98FB98', icon: 'light_mode' },
    { title: 'Зелёный', value: 'green-dark', color: '#006400', icon: 'dark_mode' },
    { title: 'Синий', value: 'blue-light', color: '#ADD8E6', icon: 'light_mode' },
    { title: 'Синий', value: 'blue-dark', color: '#00008B', icon: 'dark_mode' },
    { title: 'Жёлтый', value: 'yellow-light', color: '#FFFFE0', icon: 'light_mode' },
    { title: 'Жёлтый', value: 'yellow-dark', color: '#FFD700', icon: 'dark_mode' },
    { title: 'Циан', value: 'cyan-light', color: '#E0FFFF', icon: 'light_mode' },
    { title: 'Циан', value: 'cyan-dark', color: '#008B8B', icon: 'dark_mode' },
    { title: 'Маджента', value: 'magenta-light', color: '#FFB3E6', icon: 'light_mode' },
    { title: 'Маджента', value: 'magenta-dark', color: '#8B008B', icon: 'dark_mode' },
    { title: 'Оранжевый', value: 'orange-light', color: '#FFDAB9', icon: 'light_mode' },
    { title: 'Оранжевый', value: 'orange-dark', color: '#FF8C00', icon: 'dark_mode' },
    { title: 'Хартрез', value: 'chartreuse-light', color: '#DFFF00', icon: 'light_mode' },
    { title: 'Хартрез', value: 'chartreuse-dark', color: '#7FFF00', icon: 'dark_mode' },
    { title: 'Фиолетовый', value: 'violet-light', color: '#D8BFD8', icon: 'light_mode' },
    { title: 'Фиолетовый', value: 'violet-dark', color: '#9400D3', icon: 'dark_mode' },
    { title: 'Роза', value: 'rose-light', color: '#FFC0CB', icon: 'light_mode' },
    { title: 'Роза', value: 'rose-dark', color: '#C71585', icon: 'dark_mode' },
  ];


  public themeSubject = new BehaviorSubject<string>(localStorage.getItem('theme') || 'azure-light');
  theme$ = this.themeSubject.asObservable();

  public themeMode = new BehaviorSubject<boolean>(false);
  mode$ = this.themeMode.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(theme: string) {
    const savedTheme = localStorage.getItem('theme') || 'azure-light';

    this.renderer.removeClass(document.body, savedTheme);
    this.renderer.addClass(document.body, theme);

    localStorage.setItem('theme', theme);

    this.themeMode.next(theme.includes('dark'));
    this.themeSubject.next(theme);
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme?.includes('dark');
    if(savedTheme) {
      const prefix = savedTheme.split('-')[0];

      this.renderer.removeClass(document.body, savedTheme);

      let theme = isDarkMode ? `${prefix}-dark` : `${prefix}-light`;

      this.renderer.addClass(document.body, theme);
      localStorage.setItem('theme', theme);

      this.themeSubject.next(theme);
    } else {
      const theme = 'azure-light';
      this.renderer.addClass(document.body, theme);
      localStorage.setItem('theme', theme);
      this.themeSubject.next(theme);
    }
    this.themeMode.next(!!isDarkMode);
  }

  toggleDarkMode(isDarkMode: boolean) {
    const savedTheme = localStorage.getItem('theme') || 'azure-light';

    const prefix = savedTheme.split('-')[0];

    this.renderer.removeClass(document.body, savedTheme);

    let theme = '';

    if (isDarkMode) {
      theme = `${prefix}-dark`;
    } else {
      theme = `${prefix}-light`;
    }

    this.themeMode.next(isDarkMode);
    this.themeSubject.next(theme);

    this.renderer.removeClass(document.body, savedTheme);
    this.renderer.addClass(document.body, theme);

    localStorage.setItem('theme', theme);
  }
}
