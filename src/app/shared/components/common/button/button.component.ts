import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonShape = 'square' | 'rounded' | 'pill';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [

  ],
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() shape: ButtonShape = 'rounded';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconSize = 'text-base';

  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    return [
      this.getVariantClasses(),
      this.getSizeClasses(),
      this.getShapeClasses(),
      this.fullWidth ? 'w-full' : '',
      this.loading ? 'cursor-not-allowed' : ''
    ].join(' ');
  }

  get iconClasses(): string {
    return [
      this.iconSize,
      this.size === 'xs' || this.size === 'sm' ? 'h-3 w-3' : '',
      this.size === 'md' ? 'h-4 w-4' : '',
      this.size === 'lg' ? 'h-5 w-5' : '',
      this.size === 'xl' ? 'h-6 w-6' : '',
      this.iconPosition === 'left' ? 'mr-2' : 'ml-2'
    ].join(' ');
  }

  private getVariantClasses(): string {
    const variants = {
      primary: 'bg-[#1139E1] text-[#D4E0FA] !text-[20px] hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500',
      info: 'bg-cyan-500 text-white hover:bg-cyan-600 focus-visible:ring-cyan-500',
      light: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
      dark: 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-500',
      link: 'text-blue-600 hover:text-blue-800 hover:underline focus-visible:ring-blue-500 bg-transparent'
    };
    return variants[this.variant];
  }

  private getSizeClasses(): string {
    const sizes = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
      xl: 'px-6 py-3 text-xl'
    };
    return sizes[this.size];
  }

  private getShapeClasses(): string {
    const shapes = {
      square: 'rounded-none',
      rounded: 'rounded-md',
      pill: 'rounded-full'
    };
    return shapes[this.shape];
  }
}
