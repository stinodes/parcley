// @flow
import * as React from 'react';
import g from 'glamorous-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { text, textColor } from 'nativesystem';

const Icon = g(FeatherIcon)(text, textColor);

export { Icon };
