// @flow
import * as React from 'react';
import { SystemView as View } from 'nativesystem';
import { Circle, Text } from './index';

type Props = {
  children: string | number,
  size: number,
  color?: string,
  raised?: number,
};

const ScoreCircle = ({ children, ...props }: Props) => (
  <Circle size={48} {...props}>
    <View px={1}>
      <Text bold color="white" modifier="small" numberOfLines={1}>
        {children}
      </Text>
    </View>
  </Circle>
);

export { ScoreCircle };
