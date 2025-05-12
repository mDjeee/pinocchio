import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  validateUzPhoneNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Let required validator handle empty values
    }

    // Check if the phone number starts with 998 and has 12 digits total
    const isValid = /^998\d{9}$/.test(value);

    return isValid ? null : { invalidPhoneNumber: true };
  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Let required validator handle empty values
    }

    // Standard email regex pattern
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = pattern.test(value);

    return isValid ? null : { invalidEmail: true };
  }
}
