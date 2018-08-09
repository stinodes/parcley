// @flow
import * as React from 'react';
import { SystemView as View, Base } from 'nativesystem';

import { Text } from '../../Components';

import type { Member } from 'parcley';
import { Separator } from 'nativesystem/lib/Components/Separator';

type Props = {
  ownMember: Member,
};
class ScoreForm extends React.Component<Props> {
  render() {
    return (
      <View px={3}>
        <View fd="row" ai="center" my={1} py={2}>
          <View f={1} pr={3}>
            <Text numberOfLines={2}>
              You haven't replied to this order yet!
            </Text>
          </View>
          <Base onPress={() => {}} background={Base.Ripple('gainsBoro', true)}>
            <View py={1}>
              <Text bold color="ufoGreen">
                Reply now!
              </Text>
            </View>
          </Base>
        </View>
        <Separator color="gainsBoro" />
      </View>
    );
  }
}

export { ScoreForm };
