import * as React from 'react';
import {
  View, Animated, StyleSheet,
} from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = true;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinchableImage: {
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});


// eslint-disable-next-line react/prop-types
export default function ImageModalScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.SlideFromRightIOS,
    });
  }, [navigation]);

  /* Pinching */
  let _baseScale = new Animated.Value(1);
  let _pinchScale = new Animated.Value(1);
  const _scale = Animated.multiply(_baseScale, _pinchScale);
  let _lastScale = 1;
  const _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: _pinchScale } }],
    { useNativeDriver: USE_NATIVE_DRIVER },
  );
  /* Pan */
  const _translateX = new Animated.Value(0);
  const _translateY = new Animated.Value(0);
  const _lastOffset = { x: 0, y: 0 };
  const _onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: _translateX, translationY: _translateY } }],
    { useNativeDriver: USE_NATIVE_DRIVER },
  );
  const _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.setValue(_lastScale);
      _pinchScale.setValue(1);
    }
  };
  const _onPanGestureStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastOffset.x += event.nativeEvent.translationX;
      _lastOffset.y += event.nativeEvent.translationY;
      _translateX.setOffset(_lastOffset.x);
      _translateX.setValue(0);
      _translateY.setOffset(_lastOffset.y);
      _translateY.setValue(0);
    }
  };
  React.useEffect(() => function cleanUp() {
    _baseScale = 1;
    _pinchScale = 1;
  });

  const panRef = React.useRef(null);
  const rotationRef = React.useRef(null);
  const pinchRef = React.useRef(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PanGestureHandler
        ref={panRef}
        onGestureEvent={_onPanGestureEvent}
        onHandlerStateChange={_onPanGestureStateChange}
        minDist={10}
        minPointers={2}
        maxPointers={2}
        avgTouches
      >
        <Animated.View style={styles.wrapper}>
          <PinchGestureHandler
            ref={pinchRef}
            simultaneousHandlers={rotationRef}
            onGestureEvent={_onPinchGestureEvent}
            onHandlerStateChange={_onPinchHandlerStateChange}
          >
            <Animated.View style={styles.container} collapsable={false}>
              <Animated.Image
                style={[
                  styles.pinchableImage,
                  {
                    transform: [
                      { perspective: 200 },
                      { scale: _scale },
                      { translateX: _translateX },
                      { translateY: _translateY },
                    ],
                  },
                ]}
                source={{
                  uri: route.params?.imageURL,
                }}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
