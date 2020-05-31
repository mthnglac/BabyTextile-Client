import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import StackNavigator from '../../navigation/exchanges/StackNavigator';

const white = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default function ExchangesScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  );
}
