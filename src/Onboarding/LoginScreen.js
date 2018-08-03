// @flow
import * as React from 'react';
import { Button, Screen, SystemView as View } from 'nativesystem';
import * as firebase from 'firebase';

import { Logo, Modal, Text } from '../Components';
import type { Layout } from '../Utils';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type Props = {};
type State = {
  showLogin: boolean,
  loginButtonLayout: ?Layout,
  showRegister: boolean,
  registerButtonLayout: ?Layout,
};

class LoginScreen extends React.Component<Props, State> {
  state = {
    showLogin: false,
    loginButtonLayout: null,
    showRegister: false,
    registerButtonLayout: null,
  };

  showLogin = () => this.setState({ showLogin: true });
  showRegister = () => this.setState({ showRegister: true });

  render() {
    return (
      <Screen
        color="white"
        f={1}
        statusBarColor="white"
        statusBarStyle="dark-content"
      >
        <View ai="center" jc="center" f={0.75}>
          <Logo size={200} />
        </View>

        <View f={1} jc="center" as="center" w={200}>
          <View my={2}>
            <Button color="ufoGreen" ripple="white" onPress={this.showLogin}>
              <Text bold color="white">
                Log In
              </Text>
            </Button>
          </View>
          <View my={2}>
            <Button
              color="frenchSky"
              ripple="white"
              onPress={this.showRegister}
            >
              <Text bold color="white">
                Sign Up
              </Text>
            </Button>
          </View>
        </View>

        <LoginForm
          visible={this.state.showLogin}
          close={() => this.setState({ showLogin: false })}
        />
        <RegisterForm
          visible={this.state.showRegister}
          close={() => this.setState({ showRegister: false })}
        />
      </Screen>
    );
  }
}

export { LoginScreen };
