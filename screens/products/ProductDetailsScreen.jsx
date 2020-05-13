import * as React from 'react';
import {
  View, Button, Text,
} from 'react-native';


export default function ProductDetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go back!"
        onPress={() => navigation.navigate('Exchanges')}
      />
    </View>
  );
}
