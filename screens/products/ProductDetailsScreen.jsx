import * as React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

import Carousel from '../../components/Carousel';
import Dot from '../../components/Dot';

const dummyData = [
  {
    title: 'Anise Aroma Art Bazar',
    url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 1,
  },
  {
    title: 'Food inside a Bowl',
    url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 2,
  },
  {
    title: 'Vegatable Salad',
    url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 3,
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
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
      <Carousel data={dummyData} internalText={false} />
      <Dot data={dummyData} />
    </View>
  );
}
