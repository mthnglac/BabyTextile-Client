import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import TopTabNavigator from '../../navigation/orders/TopTapNavigator';

const white = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <TopTabNavigator />
    </View>
  );
}
