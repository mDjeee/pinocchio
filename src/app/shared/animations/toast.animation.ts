import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const toastAnimation = trigger('flyInOut', [
  state(
    'inactive',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  transition(
    'inactive => active',
    animate(
      '400ms ease-out',
      keyframes([
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        }),
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ])
    )
  ),
  transition(
    'active => removed',
    animate(
      '400ms ease-in',
      keyframes([
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
        style({
          transform: 'translateY(-20px)',
          opacity: 0,
        }),
      ])
    )
  ),
]);
