import { animate, style, transition, trigger } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  transition(':enter', [
    style({ height: '0' }),
    animate('300ms ease-in-out', style({ height: '*' }))
  ]),
  transition(':leave', [
    animate('1ms', style({ opacity: 0 })),
    animate('300ms ease-in-out', style({ height: '0' }))
  ])
]);
