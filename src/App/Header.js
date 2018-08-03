// @flow
import * as React from 'react';
import { backgroundColor, SystemView as View } from 'nativesystem';
import g from 'glamorous-native';

import { Logo } from '../Components';

const AbsoluteView = g(View)(
  {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  backgroundColor,
);

type Props = {};

const Header = (props: Props) => (
  <AbsoluteView h={80} jc="center" ai="center" color="white">
    <Logo size={80} />
  </AbsoluteView>
);

export { Header };
