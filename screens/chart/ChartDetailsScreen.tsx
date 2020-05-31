import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

import { ChartDetailsProps } from '../../constants/types/chart/ChartTypes';


export default function ChartDetailsScreen({ navigation }: ChartDetailsProps): React.ReactElement {
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
