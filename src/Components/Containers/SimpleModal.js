// @flow
import React, {Children, PureComponent} from 'react'
import {View} from 'glamorous-native'

import {CardModal} from './CardModal'
import {Text} from '../Text'
import {StyledButton} from '../Buttons'

import type {ColorProps} from '../types'
import type {Node} from 'react'

type Props = {
  children: Node,
  visible: boolean,
  onRequestClose: () => any,
}
type SimpleModalTitleProps =
  & ColorProps
  & {
  children: Node,
}
type SimpleModalActionProps =
  & ColorProps
  & {
  onPress: () => any,
  children: Node,
}
type ParsedChildren = {
  actions?: SimpleModal.Action[],
  title?: SimpleModal.Title,
  rest?: Node[],
}

class SimpleModal extends PureComponent<Props> {
  
  static Title = (props: SimpleModalTitleProps) => props.children
  static Action = (props: SimpleModalActionProps) => props.children
  
  parseChildren = (children: Node) => Children
    .toArray(children)
    .reduce(({title, actions, rest}, child) => {
      if (child.type === SimpleModal.Title)
        return {title: child, actions, rest}
      if (child.type === SimpleModal.Action)
        return {actions: actions ? [...actions, child] : [child], rest, title}
      return {rest: rest ? [...rest, child] : [child], actions, title}
    }, {})
  
  render() {
    const {children, ...props} = this.props
    
    const {actions, title, rest}: ParsedChildren = this.parseChildren(children)
    
    return (
      <CardModal
        {...props}>
        {title &&
        <View paddingVertical={8}>
          <Text dark bold>{title.props.children}</Text>
        </View>
        }
        {rest}
        {actions &&
        <View flexDirection="row" marginTop={16}>
          {actions.map(
            (action, i) => (
              <View flex={1} marginLeft={i !== 0 ? 16 : 0} marginRight={i !== actions.length - 1 ? 16 : 0}>
                <StyledButton small {...action.props}/>
              </View>
            )
          )}
        </View>
        }
      </CardModal>
    )
  }
}

export {SimpleModal}
