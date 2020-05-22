import * as React from 'react';
import {
  StyleSheet, View, Animated, Text,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import CarouselInfoContext from '../../constants/products/CarouselInfoContext';
import Carousel from '../../components/Carousel';
import Dot from '../../components/Dot';
import RadioButton from '../../components/RadioButton';
import ButtonGroup from '../../components/ButtonGroup';

const tomato = '#FE6C6B';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  qtyButton: {
    width: 40,
    height: 40,
  },
  qtyButtonBorders: {
    borderColor: '#EAEAEA',
    borderWidth: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  qtyButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  rectButton: {
    flex: 1,
    height: 60,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: tomato,
  },
});


export default function ProductDetailsScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // ...TransitionPresets.ModalPresentationIOS,
      animationEnabled: false,
    });
  }, [navigation]);

  const colors = ['#f1c40f', '#3498db', '#c0392b'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_SCROLL':
          return {
            ...prevState,
            scrollXInfo: action.setScrollXInfo,
          };
        case 'SIZE_SELECTED':
          return {
            ...prevState,
            sizeSelectedIndex: action.setSizeSelectedIndex,
          };
        case 'COLOR_SELECTED':
          return {
            ...prevState,
            colorSelectedIndex: action.setColorSelectedIndex,
          };
        default:
          return state;
      }
    },
    {
      scrollXInfo: new Animated.Value(0),
      colorSelectedIndex: null,
      sizeSelectedIndex: null,
    },
  );

  return (
    <CarouselInfoContext.Provider value={{ state, dispatch }}>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Carousel
            data={route.params?.product?.productimage_set}
            navigation={navigation}
            internalText={false}
            internalDot={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* DOT */}
          <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
            <Dot data={route.params?.product?.productimage_set} />
          </View>
          {/* Description */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text>
                @ Urun kodu: 15613 @ Fiyat: 49.90$, @ Iki iplik kumas cepli elbise
                @ Bedenler: (S/M)-(L/XL)-(XXL-XXXXL)
                @ siparis ve bilgi icin WhatsApp
              </Text>
            </View>
          </View>
          {/* Color and Qty */}
          <View style={{ flex: 0.7, flexDirection: 'row', marginHorizontal: 5 }}>
            {/* Color Radio Button */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              {colors.flatMap((color, index) => (
                <RadioButton
                  key={index}
                  selectedIndex={index}
                  activeBorderColor={color}
                  circleBackgroundColor={color}
                  selected={state.colorSelectedIndex === index}
                />
              ))}
            </View>
            {/* Qty */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginHorizontal: 15 }}>
                <BorderlessButton
                  style={styles.qtyButton}
                  rippleColor="#EAEAEA"
                  onPress={() => alert('selam')}
                >
                  <View style={styles.qtyButtonBorders}>
                    <Text style={styles.qtyButtonText}>-</Text>
                  </View>
                </BorderlessButton>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>2</Text>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <BorderlessButton
                  style={styles.qtyButton}
                  rippleColor="#EAEAEA"
                  onPress={() => alert('selam')}
                >
                  <View style={styles.qtyButtonBorders}>
                    <Text style={styles.qtyButtonText}>+</Text>
                  </View>
                </BorderlessButton>
              </View>
            </View>
          </View>
          {/* Size Button Group */}
          <View style={{ flex: 0.7, marginHorizontal: 5 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              {sizes.flatMap((size, index) => (
                <ButtonGroup
                  key={index}
                  size={size}
                  selectedIndex={index}
                  selected={state.sizeSelectedIndex === index}
                />
              ))}
            </View>
          </View>
          {/* Add to Cart Button */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
            <View style={{ flex: 1, margin: 10 }}>
              <RectButton rippleColor="#EAEAEA" style={styles.rectButton} onPress={() => alert('selam')}>
                <View accessible>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>Karta Ekle</Text>
                </View>
              </RectButton>
            </View>
          </View>
        </View>
      </View>
    </CarouselInfoContext.Provider>
  );
}
