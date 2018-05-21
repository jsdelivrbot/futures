import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const flyIn = trigger('flyIn', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
       animate(600, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 0.5, transform: 'translateX(25px)',  offset: 0.2}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
  ]),
  transition('* => void', [
        animate(600, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 0.5, transform: 'translateX(-25px)', offset: 0.8}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
  ])
]);
export const modalMock = trigger('modalMock', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
       animate(300, keyframes([
        style({opacity: 0}),
        style({opacity: 0.5}),
        style({opacity: 1})
      ]))
  ]),
  transition('* => void', [
        animate(300, keyframes([
        style({opacity: 1}),
        style({opacity: 0.5}),
        style({opacity: 0})
      ]))
  ])
]);