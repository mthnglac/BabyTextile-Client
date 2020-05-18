import * as React from 'react';
import { Animated, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { width } from '../../constants/Layout';


export default function ProductImageDetailsScreen() {
  const scale = new Animated.Value(1);
  const onZoomEvent = Animated.event(
    [
      {
        naviteEvent: { scale },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  const onZoomStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PanGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}
      >
        <Animated.View
          source={{ uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg' }}
          style={{ width, height: 300, transform: [{ scale: 1 }] }}
          resizeMode="contain"
        />
      </PanGestureHandler>
    </View>
  );
}
