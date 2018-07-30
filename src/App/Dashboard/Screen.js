// @flow
import * as React from 'react'
import {backgroundColor, Button, raised, Screen, Spinner, SystemView as View} from 'nativesystem'
import {connect} from 'react-redux'
import type {NavigationScreenProp, NavigationStateRoute} from 'react-navigation'
import {SafeAreaView} from 'react-navigation'
import g from 'glamorous-native'

import {createTabBarButton, createTabBarIcon} from '../TabBar/index'
import {hasMatches, isPending, matches} from '../Redux/selectors'
import {Text} from '../../Components/index'
import {fetchAllData} from '../Redux/index'
import {MatchList} from './MatchList'
import type {Id, Match} from 'coolio'
import {Logo} from '../../Components'
import {Header} from '../Header'

const RaisedView = g(View)(raised, backgroundColor)

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>,
}
type MappedProps = {
  isPending: boolean,
  hasMatches: boolean,
  matches: { [Id]: Match },
}

class Dashboard extends React.Component<ReduxProps<Props, MappedProps>> {
  
  componentDidMount() {
    this.props.dispatch(fetchAllData())
  }
  
  toNewMatch = () => this.props.navigation.navigate('NewMatch')
  
  render() {
    const {hasMatches, isPending} = this.props
    return (
      <Screen
        color="white" f={1} jc="center"
        statusBarColor="white"
        statusBarStyle="dark-content">
        <SafeAreaView style={{flex: 1}}>
          <View f={1} pt={80}>
            
            {isPending && <View jc="center" f={1}><Spinner color="ufoGreen" size="large"/></View>}
            {!isPending && !hasMatches &&
            <View f={1} px={3} jc="center">
              <View my={1}>
                <Text bold modifier="large" color="raisinBlack">
                  You don't have any joined matches yet!
                </Text>
              </View>
              <View>
                <Text color="raisinBlack">
                  Create or join one to begin.
                </Text>
              </View>
              <View as="center" w={200} my={4}>
                <Button raised={20} color="ufoGreen" onPress={this.toNewMatch}>
                  <Text color="white">
                    Go!
                  </Text>
                </Button>
              </View>
            </View>
            }
            {!isPending && hasMatches &&
            <MatchList/>
            }
          </View>
          <Header/>
        </SafeAreaView>
      </Screen>
    )
  }
}

const mapStateToProps = (state): MappedProps => ({
  isPending: isPending(state),
  matches: matches(state),
  hasMatches: hasMatches(state),
})
const ConnectedDashboard = connect(mapStateToProps)(Dashboard)
export {ConnectedDashboard as Dashboard}
