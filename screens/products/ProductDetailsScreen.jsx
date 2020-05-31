import * as React from 'react';
import {
  StyleSheet, View, Animated, Text,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { SimpleLineIcons } from '@expo/vector-icons';
import Carousel from '../../components/Carousel';
import RadioButton from '../../components/RadioButton';
import CarouselInfoContext from '../../constants/products/CarouselInfoContext';

const white = '#FFFFFF';
const red = '#c0392b';
const blue = '#3498db';
const yellow = '#f1c40f';
const grey = '#EAEAEA';
const tomato = '#FE6C6B';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qtyButton: {
    width: 40,
    height: 40,
  },
  qtyButtonBorders: {
    borderColor: grey,
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
  rectPickSizeButton: {
    flex: 1,
    height: 60,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: blue,
  },
  rectAddToCartButton: {
    flex: 1,
    height: 60,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});


export default function ProductDetailsScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // ...TransitionPresets.ModalPresentationIOS,
      animationEnabled: false,
    });
  }, [navigation]);

  const carouselRef = React.useRef(null);
  const colors = route.params?.colors;
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_SCROLL':
          return {
            ...prevState,
            scrollXInfo: action.setScrollXInfo,
          };
        case 'COLOR_SELECTED':
          return {
            ...prevState,
            colorSelectedIndex: action.setColorIndex,
          };
        case 'QTY_INCREMENT':
          return {
            ...prevState,
            qty: prevState.qty < 5 ? prevState.qty + 1 : prevState.qty,
          };
        case 'QTY_DECREMENT':
          return {
            ...prevState,
            qty: prevState.qty > 1 ? prevState.qty - 1 : prevState.qty,
          };
        case 'SIZE_SELECTED':
          return {
            ...prevState,
            sizeSelected: action.setSizeSelected,
            sizeSelectedValue: action.setSizeValue,
            sizeSelectedIndex: action.setSizeIndex,
          };
        default:
          return state;
      }
    },
    {
      scrollXInfo: new Animated.Value(0),
      colorSelectedIndex: 0,
      sizeSelected: false,
      sizeSelectedValue: null,
      sizeSelectedIndex: null,
      qty: 1,
    },
  );

  React.useEffect(() => {
    dispatch({ type: 'UPDATE_SCROLL', setScrollXInfo: new Animated.Value(0) });
    carouselRef.current.scrollToOffset({ offset: 0, animated: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.colorSelectedIndex]);

  return (
    <CarouselInfoContext.Provider value={{ state, dispatch }}>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Carousel
            forwardedRef={carouselRef}
            data={route.params?.product?.productimage_set.filter(
              (imageSet) => imageSet.color.slug === colors[state.colorSelectedIndex])}
            navigation={navigation}
            internalText={false}
            internalDot
            internalDotColor={white}
          />
        </View>
        <View style={{ flex: 0.6, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
          {/* Description */}
          <View style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: 15 }}>
            <View style={{ flexDirection: 'row'}}>
              <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 5, marginTop: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>15613</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: 10, marginBottom: 5, marginTop: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>49.90$</Text>
              </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}>
              <Text>
                Iki iplik Iki iplik Iki iplik kumas cepli elbise
              </Text>
            </View>
          </View>
          {/* Color and Qty */}
          <View style={{ flex: 0.7, flexDirection: 'row', marginHorizontal: 15 }}>
            {/* Color Radio Button */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <BorderlessButton
                  style={styles.qtyButton}
                  rippleColor={grey}
                  onPress={() => dispatch({ type: 'QTY_DECREMENT' })}
                >
                  <View style={styles.qtyButtonBorders}>
                    <Text style={styles.qtyButtonText}>-</Text>
                  </View>
                </BorderlessButton>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{state.qty}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <BorderlessButton
                  style={styles.qtyButton}
                  rippleColor={grey}
                  onPress={() => dispatch({ type: 'QTY_INCREMENT' })}
                >
                  <View style={styles.qtyButtonBorders}>
                    <Text style={styles.qtyButtonText}>+</Text>
                  </View>
                </BorderlessButton>
              </View>
            </View>
          </View>
          {/* Pick Size & Add to Cart Button */}
          <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
            {/* Pick Size */}
            <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 10 }}>
              <RectButton
                rippleColor={grey}
                style={styles.rectPickSizeButton}
                onPress={() => {
                  navigation.navigate('SizeModal', {
                    parentState: state,
                    parentDispatch: dispatch,
                  });
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} accessible>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: white }}>Beden Seç</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                    <SimpleLineIcons name="arrow-down" size={24} color="white" />
                  </View>
                </View>
              </RectButton>
            </View>
            {/* Add to Cart Button */}
            <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 10 }}>
              <RectButton
                rippleColor={grey}
                style={[styles.rectAddToCartButton,
                  state.sizeSelected ? { backgroundColor: tomato } : { backgroundColor: grey }]}
                onPress={() => alert('selam')}
                enabled={!!state.sizeSelected}
              >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} accessible>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: white }}>Karta Ekle</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                    <SimpleLineIcons name="arrow-right" size={24} color="white" />
                  </View>
                </View>
              </RectButton>
            </View>
          </View>
        </View>
      </View>
    </CarouselInfoContext.Provider>
  );
}
