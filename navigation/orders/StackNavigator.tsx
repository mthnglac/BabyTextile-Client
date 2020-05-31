import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StackParamList } from '../../constants/types/orders/OrderTypes';
import TopTabNavigator from './TopTabNavigator';
import OrderDetailsScreen from '../../screens/orders/OrderDetailsScreen';
import CartIcon from '../../components/CartIcon';

type ScreenInfo = {
  name: string;
  component: any;
  options: {
    headerRight: any;
  };
}

const Stack = createStackNavigator<StackParamList>();
const INITIAL_ROUTE_NAME = 'Orders';
const INITIAL_HEADER_TITLE = 'Siparişler';
const screenInfo: ScreenInfo[] = [
  // Orders
  {
    name: 'Orders',
    component: TopTabNavigator,
    options: {
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <CartIcon />
      ),
    },
  },
  // OrderDetails
  {
    name: 'OrderDetails',
    component: OrderDetailsScreen,
    options: {
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <CartIcon />
      ),
    },
  },
];


export default function StackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerTitle: INITIAL_HEADER_TITLE,
      }}
    >
      {screenInfo.flatMap((screen: any, index: number) => (
        <Stack.Screen
          name={screen.name}
          component={screen.component}
          options={{
            headerRight: screen.options.headerRight,
          }}
          key={index}
        />
      ))}
    </Stack.Navigator>
  );
}
