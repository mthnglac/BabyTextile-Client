import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

import { ExchangeDetailsProps } from '../../constants/types/exchanges/ExchangeTypes';


export default function ExchangeDetailsScreen(
  { navigation }: ExchangeDetailsProps,
): React.ReactElement {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalPresentationIOS,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go back!"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
