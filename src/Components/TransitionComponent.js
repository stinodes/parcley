// @flow
import * as React from 'react'

type Props = {
  mounted: boolean,
  children: ({onEnd: () => any, mounted: boolean, originalMounted: boolean,}) => React.Node,
}
type State = {
  closing: boolean,
  opening: boolean,
  mounted: boolean,
}

class Transition extends React.Component<Props, State> {
  state = {
    closing: false,
    opening: false,
    mounted: false,
  }
  
  constructor(props: Props) {
    super(props)
    const {mounted} = props
    if (mounted)
      this.state = {opening: true, closing: false, mounted}
    this.state = {mounted, opening: false, closing: false}
  }
  static getDerivedStateFromProps({mounted}: Props, state: State) {
    console.log('state from props', mounted)
    if (mounted)
      return {opening: true, mounted}
    if (!mounted && state.mounted)
      return {closing: true, mounted}
    return {mounted}
  }
  
  onEnd = () => {
    console.log('on end fired', !this.props.mounted && 'setting state to unmounted')
    const {opening, closing} = this.state
    if (opening)
      this.setState({opening: false})
    else if (closing)
      this.setState({closing: false})
  }
  
  render() {
    const {mounted, children} = this.props
    const {opening, closing} = this.state
    const config = {onEnd: this.onEnd, mounted: opening || closing || mounted, originalMounted: mounted,}
    console.log(config, opening, closing, mounted)
    return (
      children(config)
    )
  }
}

export {Transition}
