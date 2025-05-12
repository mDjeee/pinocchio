import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideUpAnimation = trigger('slideInOut', [
  state('void', style({ height: '0', opacity: '0' })), // Initial state (collapsed)
  state('*', style({ height: '*', opacity: '1' })), // Expanded state
  transition('void <=> *', animate('300ms ease-in-out')), // Animation for toggling
])
