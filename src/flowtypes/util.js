// @flow
export type Location = {
  pathname : string,
  search : string,
  hash : string,
}
export type History = {
  entries : Array<Location>,
}