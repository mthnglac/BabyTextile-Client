import * as React from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';
import { width } from '../constants/Layout';

type Props = {
  data: any;
  color?: string;
}

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

export default function Dot(props: Props): React.ReactElement {
  const { data, color = grey } = props;
  const { state }: any = React.useContext(CarouselInfoContext);
  const position = Animated.divide(state.scrollXInfo, width);

  return (
    <View style={styles.dotView}>
      {data.flatMap((_: any, index: number) => {
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
