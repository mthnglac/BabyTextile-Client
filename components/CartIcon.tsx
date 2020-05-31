import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const greyDark = '#52575D';
const styles = StyleSheet.create({
  cart: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 20,
  },
});

export default function CartIcon(): React.ReactElement {
  return (
    // eslint-disable-next-line no-alert
    <TouchableOpacity style={styles.cart} onPress={() => alert('This is a button!')}>
      <Ionicons name="ios-cart" size={35} color={greyDark} />
    </TouchableOpacity>
  );
}
