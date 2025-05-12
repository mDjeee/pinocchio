import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  inject
} from '@angular/core';
import { MatFormField, MatHint, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    NgTemplateOutlet,
    MatPrefix,
    LucideAngularModule,
    MatSuffix,
    MatIcon,
    MatHint,
    MatButtonModule,
    MatError,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label?: string;
  @Input() labelClass = '';
  @Input() inputClass = '';
  @Input() placeholderClass: string = '';
  @Input() hint?: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() clearable: boolean = false;
  @Input() hintText?: string;
  @Input() prefix?: TemplateRef<any>;
  @Input() suffix?: TemplateRef<any>;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() prefixLucidIcon?: string;
  @Input() suffixLucidIcon?: string;
  @Input() iconColor = '';
  @Input() formFieldClass: string = '';
  @Input() prefixIconClass: string = 'w-6 h-6';
  @Input() suffixIconClass: string = 'w-6 h-6';
  @Input() showErrors: boolean = true;
  @Input() errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'Please enter a valid email',
    minlength: 'Value is too short',
    maxlength: 'Value is too long',
    pattern: 'Invalid format'
  };

  // Remove formControl and formControlName inputs
  control: FormControl = new FormControl();

  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();

  private destroyRef = inject(DestroyRef);
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl?: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.ngControl?.control) {
      this.control = this.ngControl.control as FormControl;
    }
  }

  getErrorMessage(): string {
    if (!this.control?.errors) return '';

    const firstError = Object.keys(this.control.errors)[0];
    const customMessage = this.control.errors[firstError]?.message;

    return customMessage || this.errorMessages[firstError] || 'Invalid value';
  }

  clearInput(): void {
    if (this.control) {
      this.control.setValue('');
      this.control.markAsDirty();
      this.onChange('');
      this.onTouched();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (this.control && value !== this.control.value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  _onBlur(event: Event): void {
    this.onTouched();
    this.onBlur.emit(event);
  }
}
