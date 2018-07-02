// @flow
import * as React from 'react'
import {View} from 'react-native'

export type Layout = {
  x: number, y: number,
  w: number, h: number,
  px: number, py: number,
}

export const measure = (view: View) => new Promise((resolve, reject): Promise<Layout> => {
  try {
    view.measure(
      (x, y, w, h, px, py) => resolve({x, y, w, h, px, py,})
    )
  }
  catch(e) {
    reject(e)
  }
})
export const measureInWindow = (view: View) => new Promise((resolve, reject): Promise<Layout> => {
  try {
    view.measureInWindow(
      (x, y, w, h, px, py) => resolve({x, y, w, h, px, py,})
    )
  }
  catch(e) {
    reject(e)
  }
})
