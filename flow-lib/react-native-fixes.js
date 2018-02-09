// @flow
import {Component} from 'react'

declare var __DEV__: boolean

declare var Promise: Promise & {done: (any) => any}

declare module '../Components/StatusBar/StatusBar' {
  declare type StatusBarProps = {
    hidden?: boolean,
    animated?: boolean,
    backgroundColor?: string,
    translucent?: boolean,
    barStyle?: 'default' | 'light-content' | 'dark-content',
    networkActivityIndicatorVisible?: boolean,
    showHideTransition?: 'fade' | 'slide',
  }
  declare export class StatusBar extends Component<StatusBarProps> {}
}
