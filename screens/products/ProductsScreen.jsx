import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import StackNavigator from '../../navigation/products/StackNavigator';

const white = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});


export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  );
}
