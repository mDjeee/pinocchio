import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitMask]',
  standalone: true,
})
export class DigitMaskDirective {private regex: RegExp = new RegExp(/[^0-9*]/g); // Allow only digits and '*'

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement;
    const filteredValue = input.value.replace(this.regex, '');

    if (input.value !== filteredValue) {
      input.value = filteredValue;
      event.stopPropagation(); // Prevent unwanted event propagation
    }
  }

}
