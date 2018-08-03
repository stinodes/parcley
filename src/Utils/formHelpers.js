// @flow
export const errorMessageForName = (
  name: string,
  errors: { [key: string]: ?string },
  touched: { [key: string]: boolean },
) => (touched[name] ? errors[name] : undefined);
