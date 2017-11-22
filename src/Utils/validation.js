// @flow

export const notEmpty = (value : ?string) => {
  if (value === null || value === undefined)
    return 'Required field.'
}
