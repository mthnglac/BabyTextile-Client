import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
  size: string;
  selected: boolean;
  selectedIndex: number;
  firstChild: boolean;
  activeColor?: string;
  dispatch: any;
}

const white = '#FFFFFF';
const black = '#000000';
const grey = '#EAEAEA';
const styles = StyleSheet.create({
  rectangle: {
    height: 44,
    width: 44,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
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


export default function ButtonGroup(props: Props): React.ReactElement {
  const {
    size,
    selected,
    selectedIndex,
    firstChild,
    activeColor,
    dispatch,
  } = props;

  return (
    <TouchableWithoutFeedback
      style={[styles.rectangle, selected && styles.shadow,
        firstChild ? { marginHorizontal: 10 } : { marginHorizontal: 10 }]}
      onPress={() => {
        dispatch({
          type: 'SIZE_SELECTED',
          setSizeIndex: selectedIndex,
          setSizeValue: size,
        });
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
