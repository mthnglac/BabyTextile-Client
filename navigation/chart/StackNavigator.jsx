import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopTabNavigator from './TopTabNavigator';
import ChartDetailsScreen from '../../screens/chart/ChartDetails';
import CartIcon from '../../components/CartIcon';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Chart';
const INITIAL_HEADER_TITLE = 'Analiz';
const screenInfo = [
  // Chart
  {
    name: 'Chart',
    component: TopTabNavigator,
    options: {
      headerRight: () => (
        <CartIcon />
      ),
    },
  },
  // ChartDetails
  {
    name: 'ChartDetails',
    component: ChartDetailsScreen,
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
