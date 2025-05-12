
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passportSerialValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value) return null;
    const passportRegex = /^[A-Z]{2}\d{7}$/; // 2 uppercase letters + 7 digits
    const valid = passportRegex.test(control.value);
    return valid ? null : { invalidPassport: true };
  };
}
