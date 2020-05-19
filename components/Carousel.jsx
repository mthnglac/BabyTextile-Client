import * as React from 'react';
import {
  StyleSheet, View, Text, Image, Animated, TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';
import { width, height } from '../constants/Layout';

const grey = '#595959';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  cardTextView: {
    margin: 10,
    position: 'absolute',
    left: 5,
    bottom: 10,
  },
  cardTextTitle: {
    marginBottom: 5,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardTextDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  dotView: {
    flex: 1,
    flexDirection: 'row',
  },
  dot: {
    margin: 8,
    width: 10,
    height: 10,
    backgroundColor: grey,
    borderRadius: 5,
  },
});


function CarouselItem({ item, internalText, navigation }) {
  return (
    <TouchableOpacity
      style={styles.cardView}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ImageModal', {
        imageURL: item.url,
      })}
    >
      <Image style={styles.cardImage} source={{ uri: item.url }} />
      { internalText === true && (
      <View style={styles.cardTextView}>
        <Text style={styles.cardTextTitle}>Title</Text>
        <Text style={styles.cardTextDescription}>Description</Text>
      </View>
      )}
    </TouchableOpacity>
  );
}
CarouselItem.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  internalText: PropTypes.bool.isRequired,
};


export default function Carousel(props) {
  const { data, internalText, navigation } = props;
  const { state, dispatch } = React.useContext(CarouselInfoContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `key${index}`}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarouselItem item={item} internalText={internalText} navigation={navigation} />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: state.scrollXInfo } } }],
          {
            listener: (event) => {
              dispatch({ type: 'UPDATE_SCROLL', setScrollXInfo: event.nativeEvent.contentOffset.x });
            },
          },
        )}
      />
    </View>
  );
}
Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  internalText: PropTypes.bool,
};
Carousel.defaultProps = {
  internalText: true,
};
