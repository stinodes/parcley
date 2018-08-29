// @flow
import * as React from 'react';
import { getColor, subTheme, FormikInputWrapper } from 'nativesystem';
import g, { withTheme } from 'glamorous-native';
import { TextField } from 'react-native-material-textfield';
import type { Color } from 'nativesystem';

type Props = {
  color: Color,
  accentColor: Color,
  baseColor: Color,
};

const TextInput = ({
  theme,
  color,
  baseColor,
  accentColor,
  inputRef,
  ...props
}) => {
  const parsedProps = {
    textColor: getColor(theme, color),
    tintColor: getColor(theme, accentColor),
    baseColor: getColor(theme, baseColor),
    errorColor: getColor(theme, 'error'),
    labelHeight: !props.label ? 0 : undefined,
  };

  return (
    <TextField
      labelTextStyle={subTheme('text')({ theme, modifier: 'small' })}
      titleTextStyle={subTheme('text')({ theme, modifier: 'small' })}
      style={[subTheme('text')({ theme }), { color: parsedProps.textColor }]}
      ref={inputRef && (comp => inputRef(comp && comp.input))}
      {...props}
      {...parsedProps}
    />
  );
};

const ThemedTextInput = withTheme(TextInput);
const FTextInput = FormikInputWrapper(ThemedTextInput);

export { ThemedTextInput as TextInput, FTextInput };
