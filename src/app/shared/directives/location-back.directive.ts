import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';


@Directive({
  selector: '[appLocationBack]',
  standalone: true,
})
export class LocationBackDirective implements OnInit {
  constructor(
    private location: Location,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }

  ngOnInit() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'title', 'Назад');
    this.renderer.addClass(this.elementRef.nativeElement, '!hover:text-primary');
  }

  @HostListener('click') onClick(): void {
    this.location.back();
  }
}
