import * as React from 'react';
import {
  StyleSheet, View, Animated,
} from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

import CarouselInfoContext from '../../constants/products/CarouselInfoContext';
import Carousel from '../../components/Carousel';
import Dot from '../../components/Dot';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
  },
});


export default function ProductDetailsScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalPresentationIOS,
    });
  }, [navigation]);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_SCROLL':
          return {
            ...prevState,
            scrollXInfo: action.setScrollXInfo,
          };
        default:
          return state;
      }
    },
    {
      scrollXInfo: new Animated.Value(0),
    },
  );

  return (
    <CarouselInfoContext.Provider value={{ state, dispatch }}>
      <View style={styles.container}>
        <Carousel
          data={route.params?.product?.productimage_set}
          internalText={false}
          navigation={navigation}
        />
        <Dot data={route.params?.product?.productimage_set} />
      </View>
    </CarouselInfoContext.Provider>
  );
}
