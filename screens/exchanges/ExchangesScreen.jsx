import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import TopTabNavigator from '../../navigation/exchanges/TopTapNavigator';

const white = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default function ExchangesScreen() {
  return (
    <View style={styles.container}>
      <TopTabNavigator />
    </View>
  );
}
