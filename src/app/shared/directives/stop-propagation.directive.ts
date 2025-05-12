import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopPropagation]',
  standalone: true
})
export class StopPropagationDirective {

  constructor() { }


  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
  }

}
