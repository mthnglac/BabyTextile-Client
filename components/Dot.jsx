import * as React from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';
import { width } from '../constants/Layout';

const grey = '#595959';
const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
  },
  dot: {
    margin: 8,
    width: 7,
    height: 7,
    borderRadius: 5,
  },
});

export default function Dot(props) {
  const { data, color } = props;
  const { state } = React.useContext(CarouselInfoContext);
  const position = Animated.divide(state.scrollXInfo, width);

  return (
    <View style={styles.dotView}>
      {data.flatMap((_, index) => {
        const opacity = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View key={index} style={[styles.dot, { opacity, backgroundColor: color }]} />
        );
      })}
    </View>
  );
}

Dot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string,
};
Dot.defaultProps = {
  color: grey,
};
