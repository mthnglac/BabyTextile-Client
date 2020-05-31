import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopTabNavigator from './TopTabNavigator';
import ProductDetailsScreen from '../../screens/products/ProductDetailsScreen';
import CartIcon from '../../components/CartIcon';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Products';
const INITIAL_HEADER_TITLE = 'Ürünler';
const screenInfo = [
  // Products
  {
    name: 'Products',
    component: TopTabNavigator,
    options: {
      headerRight: () => (
        <CartIcon />
      ),
    },
  },
  // ProductDetails
  {
    name: 'ProductDetails',
    component: ProductDetailsScreen,
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
