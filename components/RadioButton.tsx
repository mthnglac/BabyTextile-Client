import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';

type Props = {
  selected: boolean;
  selectedIndex: number;
  circleBackgroundColor: string;
  activeBorderColor: string;
  activeBackgroundColor?: string;
}

const styles = StyleSheet.create({
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default function RadioButton(props: Props): React.ReactElement {
  const { dispatch }: any = React.useContext(CarouselInfoContext);
  const {
    selected,
    selectedIndex,
    circleBackgroundColor = '#222222',
    activeBorderColor = '#B6B8C7',
    activeBackgroundColor = '#FFFFFF',
  } = props;

  return (
    <TouchableWithoutFeedback
      style={[styles.circle, {
        borderColor: selected ? activeBorderColor : '#EAEAEA',
        backgroundColor: selected ? activeBackgroundColor : '#FFFFFF',
        borderWidth: selected ? 2 : 1,
      }]}
      onPress={() => {
        dispatch({ type: 'COLOR_SELECTED', setColorIndex: selectedIndex });
      }}
    >
      <View style={[styles.selectedCircle, { backgroundColor: circleBackgroundColor }]} />
    </TouchableWithoutFeedback>
  );
}
