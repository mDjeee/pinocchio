import { animate, style, transition, trigger } from '@angular/animations';

export const slideInOutAnimation = [
  trigger('slideInOut', [
    transition(':enter', [
      style({ opacity: 0, width: 0 }),
      animate('200ms ease-in-out',
        style({ opacity: 1, width: '*' }))
    ]),
    transition(':leave', [
      animate('50ms ease-in-out',
        style({ opacity: 0, width: 0 }))
    ])
  ])
];
