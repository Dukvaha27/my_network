import { css } from 'styled-components';
import { breakpoints } from './breakpoints';

export const respondTo = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      ${label !== 'mobile'
            ? `@media (min-width: ${breakpoints[label]})`
            : '@media (max-width: 639px)'} {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {
  },
);
