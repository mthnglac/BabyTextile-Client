import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopTabNavigator from './TopTabNavigator';
import ExchangeDetailsScreen from '../../screens/exchanges/ExchangeDetailsScreen';
import CartIcon from '../../components/CartIcon';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Exchanges';
const INITIAL_HEADER_TITLE = 'Değişimler';
const screenInfo = [
  // Exchanges
  {
    name: 'Exchanges',
    component: TopTabNavigator,
    options: {
      headerRight: () => (
        <CartIcon />
      ),
    },
  },
  // ExchangeDetails
  {
    name: 'ExchangeDetails',
    component: ExchangeDetailsScreen,
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
