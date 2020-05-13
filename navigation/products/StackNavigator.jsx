import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopTabNavigator from './TopTabNavigator';
import ProductDetailsScreen from '../../screens/products/ProductDetailsScreen';
import CartIcon from '../../components/CartIcon';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'TopTabNavigator';


export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerShown: false,
          headerLeft: () => (
            <CartIcon />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
