// @flow
import * as React from 'react'
import {Animated, Dimensions, ScrollView} from 'react-native'
import g from 'glamorous-native'
import {withFormik} from 'formik'

import {SystemView as View} from '../helpers'
import {QuestionInput} from './QuestionInput'

const absoluteStyle = {
  position: 'absolute',
  top: 0, right: 0, bottom: 0, left: 0,
}
const AbsoluteAnimatedView = g(Animated.View)(
  absoluteStyle,
  ({transparent, theme}) => ({
    backgroundColor: transparent ? 'transparent' : theme.colors.white,
  })
)
const AnimatedView = g(Animated.View)()
const QuestionWrapper = g(View)({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
})

type Props = {
  animationDriver?: any,
  transparent?: boolean,
  children: React.Node,
}
type State = {
  currentInput: number,
  inputAnimation: Animated.Value,
}

class QuestionForm extends React.Component<Props, State> {
  state = {
    currentInput: 0,
    inputWidth: Dimensions.get('window').width,
    inputAnimation: new Animated.Value(0),
  }
  questionsLength: number = 0
  questionRefs: QuestionInput[] = []
  
  static Question = (props) => null
  
  componentDidUpdate(oldProps: Props, oldState: State) {
    if (oldState.currentInput !== this.state.currentInput) {
      this.animateToInput(this.state.currentInput)
      this.questionRefs[this.state.currentInput].focus()
    }
  }
  
  onQuestionSubmit = () => {
    this.nextQuestion()
  }
  nextQuestion = () => {
    this.setState({currentInput: Math.min(this.questionsLength, Math.max(0, this.state.currentInput + 1))})
  }
  
  animateToInput(input: number) {
    Animated.spring(
      this.state.inputAnimation,
      {toValue: input}
    ).start()
  }
  
  render() {
    const {animationDriver, transparent, children} = this.props
    const parsedQuestions = React.Children
      .toArray(children)
      .filter(child => child.type === QuestionForm.Question)
      .map((child, i) => (
        <QuestionWrapper key={i} px={4} py={2}>
          <QuestionInput
            {...child.props}
            onChange={this.props.setFieldValue}
            value={this.props.values[child.props.name]}
            inputRef={comp => this.questionRefs[i] = comp}
            onSubmitEditing={this.onQuestionSubmit}
            returnKeyType="next"/>
        </QuestionWrapper>
      ))
    this.questionsLength = parsedQuestions.length
    return (
      <AbsoluteAnimatedView transparent={transparent} style={[animationDriver]}>
        <AnimatedView
          style={[
            {
              flexDirection: 'row',
              alignSelf: 'flex-start',
              width: this.questionsLength * this.state.inputWidth,
              transform: [
                {
                translateX: this.state.inputAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -this.state.inputWidth],
                })
              }]
            }
          ]}>
          {parsedQuestions}
        </AnimatedView>
      </AbsoluteAnimatedView>
    )
  }
}

const QuestionFormWithFormik = withFormik({
  handleSubmit: (values, {props}) => {
    props.onSubmit(values)
  }
})(QuestionForm)
QuestionFormWithFormik.Question = QuestionForm.Question

export {QuestionFormWithFormik as QuestionForm}
