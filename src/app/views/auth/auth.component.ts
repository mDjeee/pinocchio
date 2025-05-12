import { Component, DestroyRef } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { LatinDigitSymbolsDirective } from '../../shared/directives/latin-digit-symbols.directive';
import { ButtonComponent } from '../../shared/components/common/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { InputComponent } from '../../shared/components/common/input/input.component';
import { SvgIconComponent } from '../../shared/components/common/svg-icon/svg-icon.component';
import { LoginService } from '../../core/services/login.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { StorageService } from '../../core/services/storage.service';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-auth-layout',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatButton,
    LatinDigitSymbolsDirective,
    ButtonComponent,
    LucideAngularModule,
    InputComponent,
    MatIconButton,
    SvgIconComponent,
  ],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  hidePassword = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private storageService: StorageService,
    private spinnerService: SpinnerService
    ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.getRawValue();
      this.loginService.loginUser(payload)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res: any) => {
            const tokenData = this.tokenService.parseTokenResponse(res);
            this.storageService.setToken(tokenData.token);

            const claims = this.tokenService.getTokenClaims(tokenData.token);
            const userId = this.tokenService.getUserId(tokenData.token);
            const isExpired = this.tokenService.isTokenExpired(tokenData.token);
            const email = this.tokenService.getEmail(tokenData.token);
            const fullName = this.tokenService.getFullName(tokenData.token);

            if(email || fullName) {
              this.storageService.setUserDetail(email as string, fullName as string);
            }

            this.router.navigate(['/companies']);
          },
          error: (err) => {
            this.toastrService.error(err.message);
          }
        });
    }
  }
}
