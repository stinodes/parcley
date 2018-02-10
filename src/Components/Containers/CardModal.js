// @flow
import React from 'react'
import {Modal, TouchableWithoutFeedback} from 'react-native'
import {transparentize} from 'polished'
import glamorous from 'glamorous-native'
import {Base} from '../Buttons'
import {Card} from './Card'

import type {CardProps} from './Card'
import type {Node} from 'react'

const Overlay = glamorous(Base)({
  flex: 1,
  padding: 32,
  justifyContent: 'center'
}, ({theme, color}) => ({
  backgroundColor: color || transparentize(0.2, theme.base.secondary),
}))

type ModalProps = {
  visible: boolean,
  transparent?: boolean,
  animationType?: string,
  onRequestClose: () => any,
  overlayColor?: string,
}

type Props =
  & CardProps
  & ModalProps
  & {
  children: Node,
}

const CardModal = ({children, primary, secondary, tertiary, color, overlayColor, ...props}: Props) => {
  const cardProps = !primary && !secondary && !tertiary && !color ?
    {color: 'white'} :
    {
      primary,
      secondary,
      tertiary,
      color
    }
  return (
    <Modal transparent animationType="slide" {...props}>
      <Overlay color={overlayColor} containerStyle={{flex: 1}} onPress={props.onRequestClose}>
        <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
          <Card raised={5} radius={5} padding={32} {...cardProps}>
            {children}
          </Card>
        </TouchableWithoutFeedback>
      </Overlay>
    </Modal>
  )
}

export {CardModal}
