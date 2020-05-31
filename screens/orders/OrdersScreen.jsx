import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import StackNavigator from '../../navigation/orders/StackNavigator';

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
      <StackNavigator />
    </View>
  );
}
