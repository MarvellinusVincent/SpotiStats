import { css } from 'styled-components';

const sizes = {
  giant: 1440,
  desktop: 1200,
  netbook: 1000,
  tablet: 768,
  thone: 600,
  phablet: 480,
  phone: 376,
  tiny: 330,
  md: 768
};


export const Media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default Media;