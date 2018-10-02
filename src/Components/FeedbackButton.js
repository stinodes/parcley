// @flow
import * as React from "react";
import { Animated, View as RNView } from "react-native";
import g from "glamorous-native";
import {
  Button,
  Coordinator,
  Element,
  View,
  Spinner,
  subTheme,
  backgroundColor,
  withFallback
} from "nativesystem";

import { Background } from "./Background";
import { Icon } from "./Icon";
import { Text } from "./Text";

const FakeButtonView = g(RNView)(
  subTheme("button"),
  withFallback(backgroundColor),
  {
    alignItems: "center",
    justifyContent: "center"
  }
);

type ContentProps = {
  color?: string,
  icon?: string,
  children?: string | React.Node
};
const FeedbackContent = ({ children, color = "white", icon }: ContentProps) => {
  if (children && typeof children !== "string") return children;
  return (
    <View ai="center" fd="row">
      {icon && (
        <Icon
          name={icon}
          color={color}
          modifier={children ? "icon-large" : "icon"}
        />
      )}
      {children && (
        <View ml={1}>
          <Text color={color}>{children}</Text>
        </View>
      )}
    </View>
  );
};

type Props = {
  onPress: () => Promise<*> | any,
  color?: string,
  feedbackDuration?: number,
  modifier?: string | string[],
  errorIcon?: string,
  successIcon?: string,
  errorContent?: React.Element<typeof FeedbackContent>,
  successContent?: React.Element<typeof FeedbackContent>,
  children: React.Node
};
type State = {
  status: 0 | 1 | 2 | 3
};

class FeedbackButton extends React.Component<Props, State> {
  state = {
    status: 0
  };
  STATUS = ["idle", "pending", "success", "error"];
  DEFAULT_DURATION = 5000;
  timeoutId: TimeoutID;
  pendingAnimation = new Animated.Value(0);
  feedbackAnimation = new Animated.Value(0);

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.status !== prevState.status) {
      switch (this.STATUS[this.state.status]) {
        case "idle":
          break;
        case "pending":
          this.animatePending(1);
          break;
        case "success":
          this.animateFeedback(1);
          break;
        case "error":
          this.animateFeedback(1);
          break;
      }
      if (this.STATUS[this.state.status] !== "idle") {
        this.resetAfterTimeout();
      }
    }
  }

  animatePending(toValue: number) {
    Animated.spring(this.pendingAnimation, {
      toValue,
      useNativeDriver: true
    }).start();
  }
  animateFeedback(toValue: number) {
    Animated.spring(this.feedbackAnimation, {
      toValue,
      useNativeDriver: true
    }).start();
  }
  resetAnimations() {
    Animated.parallel([
      Animated.spring(this.feedbackAnimation, {
        toValue: 0,
        useNativeDriver: true
      }),
      Animated.spring(this.pendingAnimation, {
        toValue: 0,
        useNativeDriver: true
      })
    ]).start();
  }

  onPress = async () => {
    try {
      const maybePromise = this.props.onPress();
      if (maybePromise instanceof Promise) {
        this.setPending();
        await maybePromise;
      }
      this.setSuccess();
    } catch (e) {
      this.setError();
    }
  };
  setPending() {
    this.setState({ status: 1 });
  }
  setSuccess() {
    this.setState({ status: 2 });
  }
  setError() {
    this.setState({ status: 3 });
  }
  reset = () => {
    Animated.parallel([
      Animated.spring(this.feedbackAnimation, {
        toValue: 0,
        useNativeDriver: true
      }),
      Animated.spring(this.pendingAnimation, {
        toValue: 0,
        useNativeDriver: true
      })
    ]).start(() => this.setState({ status: 0 }));
  };
  resetAfterTimeout() {
    this.timeoutId = setTimeout(
      this.reset,
      this.props.feedbackDuration || this.DEFAULT_DURATION
    );
  }

  render() {
    const {
      children,
      onPress,
      feedbackDuration,
      errorIcon,
      successIcon,
      errorContent,
      successContent,
      ...props
    } = this.props;
    const { status } = this.state;
    const statusStr = this.STATUS[status];
    if (errorContent && errorContent.type !== FeedbackContent)
      throw new Error(
        'prop "errorContent" should be an instance of "FeedbackContent".'
      );
    if (successContent && successContent.type !== FeedbackContent)
      throw new Error(
        'prop "successContent" should be an instance of "FeedbackContent".'
      );
    return (
      <Coordinator animation={this.feedbackAnimation} inputRange={[0, 1]}>
        <Coordinator animation={this.pendingAnimation} inputRange={[0, 1]}>
          <Button {...props} onPress={this.onPress}>
            {children}
            <Element
              positioning={{ top: 0, bottom: 0, left: 0, right: 0 }}
              start={{ opacity: 0 }}
              end={{ opacity: 1 }}
            >
              <FakeButtonView {...props}>
                <Element relative start={{ y: 200 }} end={{ y: 0 }}>
                  <Spinner color="white" />
                </Element>
              </FakeButtonView>
            </Element>
          </Button>
        </Coordinator>
        {statusStr === "error" && (
          <Element
            positioning={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
          >
            <FakeButtonView color="error" modifier={props.modifier}>
              <Element relative start={{ y: 200 }} end={{ y: 0 }}>
                {errorContent || (
                  <FeedbackContent
                    icon={errorIcon || "alert-circle"}
                    color="white"
                  />
                )}
              </Element>
            </FakeButtonView>
          </Element>
        )}
        {statusStr === "success" && (
          <Element
            positioning={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
          >
            <FakeButtonView color="ufoGreen" modifier={props.modifier}>
              <Element relative start={{ y: 200 }} end={{ y: 0 }}>
                {successContent || (
                  <FeedbackContent
                    icon={successIcon || "check-circle"}
                    color="white"
                  />
                )}
              </Element>
            </FakeButtonView>
          </Element>
        )}
      </Coordinator>
    );
  }
}

export { FeedbackButton, FeedbackContent };
