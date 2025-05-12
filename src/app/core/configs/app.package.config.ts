import { HttpClient } from '@angular/common/http';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export const TranslateConfigConst = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
  defaultLanguage: 'ru',
};

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const iconClasses = {
  error: 'toast-error',
  info: 'toast-info',
  success: 'toast-success',
  warning: 'toast-warning',
};
export const ToastrConfigConst = {
  closeButton: true,
  positionClass: 'toast-top-right',
  newestOnTop: true,
  iconClasses,
  extendedTimeOut: 5000,
  resetTimeoutOnDuplicate: true,
  toastComponent: ToastComponent,
};
