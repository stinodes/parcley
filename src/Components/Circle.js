// @flow
import g from 'glamorous-native';
import { backgroundColor, raised, space } from 'nativesystem';

const Circle = g.view(
  { justifyContent: 'center', alignItems: 'center' },
  ({ size }) => ({ width: size, height: size, borderRadius: size * 0.5 }),
  space,
  backgroundColor,
  raised,
);

export { Circle };
