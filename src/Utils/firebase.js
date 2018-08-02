// @flow
import type {Id, ReadError as ReadErrorInterface} from 'parcley'

export class ReadError<Data = Id> implements ReadErrorInterface<Data> {
  error = true
  data: Data
  constructor(data: Data) {
    this.data = data
  }
  static isError(arg: ReadErrorInterface<*>|any) {
    return arg && arg.error
  }
  static isNotError(arg: ReadErrorInterface<*>|any) {
    return !arg || !arg.error
  }
}
export const createReadError = <Data>(data: Data): ReadError<Data> => new ReadError(data)

export const toEntityMap = <Obj: {uid: Id}>(objects: Obj[]): {[Id]: Obj} =>
  objects
    .filter(object => !!object)
    .reduce((prev, object) => ({...prev, [object.uid]: object}), {})
