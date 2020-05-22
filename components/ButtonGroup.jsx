import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';

const white = '#FFFFFF';
const black = '#000000';
const grey = '#EAEAEA';
const tomato = '#FE6C6B';
const styles = StyleSheet.create({
  rectangle: {
    height: 44,
    width: 44,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    backgroundColor: white,
  },
  innerRectangle: {
    height: 44,
    width: 44,
    borderRadius: 11,
    borderColor: grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: black,
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
});


export default function ButtonGroup(props) {
  const { dispatch } = React.useContext(CarouselInfoContext);
  const {
    size,
    selected,
    selectedIndex,
    activeColor,
  } = props;

  return (
    <TouchableWithoutFeedback
      style={[styles.rectangle, selected && styles.shadow]}
      onPress={() => {
        dispatch({ type: 'SIZE_SELECTED', setSizeSelectedIndex: selectedIndex });
      }}
    >
      <View style={[styles.innerRectangle, {
        borderWidth: selected ? 0 : 2,
        backgroundColor: selected ? activeColor : white,
      }]}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: selected ? white : grey }}>{size}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

ButtonGroup.propTypes = {
  size: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
};
ButtonGroup.defaultProps = {
  activeColor: tomato,
};
