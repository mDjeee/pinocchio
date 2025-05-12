import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { ToastrConfigConst } from './core/configs/app.package.config'
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { sessionInterceptor } from './core/interceptors/session.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

import {
  LucideAngularModule,
  Eye,
  EyeOff,
  User,
  PhoneCall,
  Phone,
  RectangleEllipsis,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  RefreshCw,
  X,
  CloudUpload,
  FileText,
  Users,
  ShieldUser,
  UserRoundMinus,
  Trash,
  Edit,
  Info,
  Pencil,
  UserRoundPlus, Building2,
} from 'lucide-angular';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr(ToastrConfigConst),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      responseInterceptor,
      authInterceptor,
      spinnerInterceptor,
      sessionInterceptor,
    ])),
    provideEnvironmentNgxMask(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' }
    },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    importProvidersFrom(
      LucideAngularModule.pick({
        Eye,
        EyeOff,
        User,
        Users,
        ShieldUser,
        UserRoundMinus,
        PhoneCall,
        Phone,
        RectangleEllipsis,
        LogOut,
        ChevronDown,
        X,
        ChevronLeft,
        ChevronRight,
        RefreshCcw,
        RefreshCw,
        CloudUpload,
        FileText,
        Trash,
        Edit,
        Info,
        Pencil,
        UserRoundPlus,
        Building2,
      })
    )
  ]
};
