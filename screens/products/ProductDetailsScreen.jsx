import * as React from 'react';
import {
  StyleSheet, View, Animated, Text, Image, Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControl from '@react-native-community/segmented-control';

import CarouselInfoContext from '../../constants/products/CarouselInfoContext';
import Carousel from '../../components/Carousel';
import Dot from '../../components/Dot';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default function ProductDetailsScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // ...TransitionPresets.ModalPresentationIOS,
      animationEnabled: false,
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
        case 'SELECTED':
          return {
            ...prevState,
            buttonGroupIndex: action.setButtonGroupIndex,
          };
        default:
          return state;
      }
    },
    {
      scrollXInfo: new Animated.Value(0),
      buttonGroupIndex: 0,
    },
  );

  return (
    <CarouselInfoContext.Provider value={{ state, dispatch }}>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'blue' }}>
          <Carousel
            data={route.params?.product?.productimage_set}
            internalText={false}
            navigation={navigation}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'pink' }}>
          {/* DOT */}
          <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'peru', marginHorizontal: 5 }}>
            <Dot data={route.params?.product?.productimage_set} />
          </View>
          {/* Title */}
          <View style={{ flex: 1, backgroundColor: 'darkmagenta' }}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', marginHorizontal: 5 }}>
              <View style={{ flex: 1, backgroundColor: 'red', marginHorizontal: 10 }}>
                <Text>Thamis Chair</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: 'red', marginHorizontal: 10 }}>
                <Text style={{ alignSelf: 'flex-end' }}>$ 125</Text>
              </View>
            </View>
          </View>
          {/* Description */}
          <View style={{ flex: 1, backgroundColor: 'green' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'aquamarine', marginHorizontal: 5 }}>
              <View style={{ flex: 1, backgroundColor: 'red', marginHorizontal: 10 }}>
                <Text>
                  @ Urun kodu: 15613 @ Fiyat: 49.90$, @ Iki iplik kumas cepli elbise
                  @ Bedenler: (S/M)-(L/XL)-(XXL-XXXXL)
                  @ siparis ve bilgi icin WhatsApp
                </Text>
              </View>
            </View>
          </View>
          {/* Color and Qty */}
          <View style={{ flex: 1, backgroundColor: 'greenyellow' }}>
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 5 }}>
              {/* Color ScrollView */}
              <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'peru' }}
                showHorizontalScrollIndicator={false}
                horizontal
              >
                <View style={{ flex: 1, width: 20, height: 20, borderRadius: 12, overflow: 'hidden', marginHorizontal: 10, backgroundColor: 'red' }}>
                  <Image />
                  <Text>SI</Text>
                </View>
                <View style={{ flex: 1, width: 20, height: 20, borderRadius: 12, overflow: 'hidden', marginHorizontal: 10, backgroundColor: 'red' }}>
                  <Image />
                  <Text>SI</Text>
                </View>
                <View style={{ flex: 1, width: 20, height: 20, borderRadius: 12, overflow: 'hidden', marginHorizontal: 10, backgroundColor: 'red' }}>
                  <Image />
                  <Text>SI</Text>
                </View>
              </ScrollView>
              {/* Qty */}
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple' }}>
                <View style={{ marginHorizontal: 10 }}>
                  <Button title="-" onPress={() => alert('selam')} />
                </View>
                <View>
                  <Text>2</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Button title="+" onPress={() => alert('selam')} />
                </View>
              </View>
            </View>
          </View>
          {/* Size Button Group */}
          <View style={{ flex: 1, backgroundColor: 'tomato' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, backgroundColor: 'purple' }}>
              <SegmentedControl
                values={['One', 'Two', 'Three']}
                selectedIndex={state.buttonGroupIndex}
                textColor="red"
                tintColor="blue"
                activeTextColor="black"
                backgroundColor="turquoise"
                style={{ marginHorizontal: 10 }}
                onChange={(event) => {
                  dispatch({ type: 'SELECTED', setButtonGroupIndex: event.nativeEvent.selectedSegmentIndex });
                }}
              />
            </View>
          </View>
          {/* Like & Add to Cart Button */}
          <View style={{ flex: 1, backgroundColor: 'mediumpurple' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, backgroundColor: 'aquamarine' }}>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Button title="Galp" onPress={() => alert('selam')} />
              </View>
              <View style={{ flex: 3, marginHorizontal: 10 }}>
                <Button title="Add to Cart" onPress={() => alert('selam')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </CarouselInfoContext.Provider>
  );
}
