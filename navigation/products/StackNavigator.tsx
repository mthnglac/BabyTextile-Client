import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StackParamList } from '../../constants/types/products/ProductTypes';
import TopTabNavigator from './TopTabNavigator';
import ProductDetailsScreen from '../../screens/products/ProductDetailsScreen';
import CartIcon from '../../components/CartIcon';

type ScreenInfo = {
  name: string;
  component: any;
  options: {
    headerRight: any;
  };
}

const Stack = createStackNavigator<StackParamList>();
const INITIAL_ROUTE_NAME = 'Products';
const INITIAL_HEADER_TITLE = 'Ürünler';
const screenInfo: ScreenInfo[] = [
  // Products
  {
    name: 'Products',
    component: TopTabNavigator,
    options: {
      // eslint-disable-next-line react/display-name
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
