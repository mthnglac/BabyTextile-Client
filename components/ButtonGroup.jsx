import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';

const white = '#FFFFFF';
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
  selectedRectangle: {
    height: 44,
    width: 44,
    borderRadius: 11,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
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
    <TouchableOpacity
      style={styles.rectangle}
      onPress={() => {
        dispatch({ type: 'SIZE_SELECTED', setSizeSelectedIndex: selectedIndex });
      }}
    >
      <View style={[styles.selectedRectangle, {
        borderWidth: selected ? 0 : 2,
        backgroundColor: selected ? activeColor : white,
      }]}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: selected ? white : grey }}>{size}</Text>
      </View>
    </TouchableOpacity>
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
