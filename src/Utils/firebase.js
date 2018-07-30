// @flow
import type {Id} from 'coolio'

export const toEntityMap = <Obj: {uid: Id}>(objects: Obj[]): {[Id]: Obj} =>
  objects
    .filter(object => !!object)
    .reduce((prev, object) => ({...prev, [object.uid]: object}), {})
