import * as React from 'react';
import {
  StyleSheet, View, Button, Text,
} from 'react-native';
import {
  TransitionPresets,
} from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function ProductDetailsScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalPresentationIOS,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go back!"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
