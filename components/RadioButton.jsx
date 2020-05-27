import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';

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


export default function RadioButton(props) {
  const { dispatch } = React.useContext(CarouselInfoContext);
  const {
    selected,
    selectedIndex,
    circleBackgroundColor,
    activeBorderColor,
    activeBackgroundColor,
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

RadioButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  circleBackgroundColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  activeBackgroundColor: PropTypes.string,
};
RadioButton.defaultProps = {
  circleBackgroundColor: '#222222',
  activeBorderColor: '#B6B8C7',
  activeBackgroundColor: '#FFFFFF',
};
