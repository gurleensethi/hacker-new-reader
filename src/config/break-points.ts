export enum DeviceType {
  MOBILE,
  TABLET,
  DESKTOP,
}

export const breakPointsValues = {
  tablet: 600,
  desktop: 1100,
};

const breakPoints = {
  tablet: `@media (min-width: ${breakPointsValues.tablet}px)`,
  desktop: `@media (min-width: ${breakPointsValues.desktop}px)`,
};

export default breakPoints;
