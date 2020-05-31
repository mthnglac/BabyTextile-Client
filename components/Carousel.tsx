import * as React from 'react';
import {
  StyleSheet, View, Text, Image, Animated,
} from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import CarouselInfoContext from '../constants/products/CarouselInfoContext';
import { width, height } from '../constants/Layout';
import Dot from './Dot';

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
  },
  cardImage: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    // borderBottomLeftRadius: 40,
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
  containerDot: {
    margin: 10,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

type PropsCarouselItem = {
  item: {
    image: string;
  };
  internalText: boolean;
  cardShadow: boolean;
  navigation: any;
}
type PropsCarousel = {
  data: any;
  internalText: boolean;
  internalDot: boolean;
  internalDotColor: string;
  cardShadow?: boolean;
  navigation: any;
  forwardedRef: any;
}

function CarouselItem(props: PropsCarouselItem) {
  const {
    item,
    internalText,
    cardShadow,
    navigation,
  } = props;

  return (
    <TouchableWithoutFeedback
      style={[styles.cardView, cardShadow && {
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
      }]}
      onPress={() => navigation.navigate('ImageModal' as any, {
        imageURL: item.image,
      } as any)}
    >
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      { internalText && (
      <View style={styles.cardTextView}>
        <Text style={styles.cardTextTitle}>Title</Text>
        <Text style={styles.cardTextDescription}>Description</Text>
      </View>
      )}
    </TouchableWithoutFeedback>
  );
}

export default function Carousel(props: PropsCarousel): React.ReactElement {
  const {
    data,
    internalText = true,
    internalDot = true,
    internalDotColor = grey,
    cardShadow = true,
    navigation,
    forwardedRef,
  } = props;
  const { state, dispatch }: any = React.useContext(CarouselInfoContext);

  return (
    <View style={styles.container}>
      <FlatList
        ref={forwardedRef}
        data={data}
        keyExtractor={(item: any, index: number) => `key${index}`}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }): any => (
          <CarouselItem
            item={item}
            internalText={internalText}
            cardShadow={cardShadow}
            navigation={navigation}
          />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: state.scrollXInfo } } }],
          {
            useNativeDriver: false,
            listener: (event: any) => {
              dispatch({ type: 'UPDATE_SCROLL', setScrollXInfo: event.nativeEvent.contentOffset.x });
            },
          },
        )}
      />
      {internalDot && (
        // DOT
        <View style={styles.containerDot}>
          <Dot data={data} color={internalDotColor} />
        </View>
      )}
    </View>
  );
}
