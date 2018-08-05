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

type Props = {
  left?: React.Node,
  right?: React.Node,
};

const Header = (props: Props) => (
  <AbsoluteView h={80} jc="center" ai="center" color="white" fd="row">
    <View f={1} fd="row">
      {props.left}
    </View>
    <Logo size={80} />
    <View f={1} fd="row-reverse">
      {props.right}
    </View>
  </AbsoluteView>
);

export { Header };
