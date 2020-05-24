import * as React from 'react';
import { View, StyleSheet, Text, YellowBox } from 'react-native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TransitionPresets } from '@react-navigation/stack';

import ButtonGroup from '../../components/ButtonGroup';

const white = '#FFFFFF';
const grey = '#EAEAEA';
const blue = '#3498db';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  touchableContainer: {
    height: '100%',
    width: '100%',
  },
  innerTopContainer: {
    flex: 0.5,
  },
  innerBottomContainer: {
    flex: 0.5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectPickSizeButton: {
    flex: 1,
    padding: 10,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: blue,
  },
});


export default function SizeModalScreen({ navigation, route }) {
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalPresentationIOS,
      cardStyle: {
        backgroundColor: 'transparent',
      },
    });
  }, [navigation]);

  const { parentState, parentDispatch } = route.params;
  const sizes = ['S', 'M', 'L', 'XL'];
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIZE_SELECTED':
          return {
            ...prevState,
            sizeSelectedValue: action.setSizeValue,
            sizeSelectedIndex: action.setSizeIndex,
          };
        default:
          return state;
      }
    },
    {
      sizeSelectedValue: parentState.sizeSelectedValue,
      sizeSelectedIndex: parentState.sizeSelectedIndex,
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerTopContainer}>
        <TouchableWithoutFeedback
          style={styles.touchableContainer}
          onPress={() => navigation.goBack()}
        >
          <View />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.innerBottomContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Pick Group Buttons */}
          <View style={{ flexDirection: 'row' }}>
            {sizes.flatMap((size, index) => (
              <ButtonGroup
                key={index}
                size={size}
                firstChild={index === 0}
                selectedIndex={index}
                selected={state.sizeSelectedIndex === index}
                dispatch={dispatch}
              />
            ))}
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* Pick Button */}
          <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 100 }}>
            <RectButton
              rippleColor={grey}
              style={styles.rectPickSizeButton}
              onPress={() => {
                parentDispatch({
                  type: 'SIZE_SELECTED',
                  setSizeSelected: true,
                  setSizeValue: state.sizeSelectedValue,
                  setSizeIndex: state.sizeSelectedIndex,
                });
                navigation.goBack();
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row' }} accessible>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: white }}>Beden Seç</Text>
                </View>
              </View>
            </RectButton>
          </View>
        </View>
      </View>
    </View>
  );
}
