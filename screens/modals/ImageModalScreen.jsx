import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';


export default function ImageModalScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.SlideFromRightIOS,
    });
  }, [navigation]);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
