// @flow
import * as React from 'react'
import {StackNavigator, addNavigationHelpers} from 'react-navigation'
import {createReduxBoundAddListener, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers'
import {connect} from 'react-redux'

const Navigator = StackNavigator(
  {
    'login': {
      screen: () => null,
    },
  },
  {}
)

const reducer = (state: Object, action: Action<string, *>) => {
  const newState = Navigator.router.getStateForAction(action)
  return newState||state
}
const navStateSelector = (store) => store.navigation.root

const rootNavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  navStateSelector,
)
const addListener = createReduxBoundAddListener("root")

type MappedProps = {
  navigation: Object,
}
type RootNavigatorProps = ReduxProps<{}, MappedProps>

class RootNavigator extends React.Component<RootNavigatorProps> {
  static router = Navigator.router
  
  render() {
    const {navigation, dispatch} = this.props
    return (
      <Navigator navigation={addNavigationHelpers({dispatch, state: navigation, addListener})}/>
    )
  }
}

const mapStateToProps = (state): MappedProps => ({
  navigation: navStateSelector(state)
})

const ConnectedRootNavigator = connect(mapStateToProps)(RootNavigator)
export {ConnectedRootNavigator as RootNavigator, rootNavigatorMiddleware, reducer}