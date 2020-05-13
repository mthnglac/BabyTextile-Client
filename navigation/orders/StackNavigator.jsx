import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopTabNavigator from './TopTabNavigator';
import OrderDetailsScreen from '../../screens/orders/OrderDetailsScreen';
import CartIcon from '../../components/CartIcon';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Orders';
const INITIAL_HEADER_TITLE = 'Siparişler';
const screenInfo = [
  // Orders
  {
    name: 'Orders',
    component: TopTabNavigator,
    options: {
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
      headerRight: () => (
        <CartIcon />
      ),
    },
  },
];


export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerTitle: INITIAL_HEADER_TITLE,
      }}
    >
      {screenInfo.flatMap((screen, index) => (
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
