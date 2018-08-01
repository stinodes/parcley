// @flow
import type {Id} from 'parcley'

export const toEntityMap = <Obj: {uid: Id}>(objects: Obj[]): {[Id]: Obj} =>
  objects
    .filter(object => !!object)
    .reduce((prev, object) => ({...prev, [object.uid]: object}), {})
