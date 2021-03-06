import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ProductsScreen from '../screens/products/ProductsScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import ExchangesScreen from '../screens/exchanges/ExchangesScreen';
import ChartScreen from '../screens/chart/ChartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

const BottomTab = createMaterialBottomTabNavigator();
const purple = '#694fad';
const INITIAL_ROUTE_NAME = 'Products';
const screenInfo = [
  // ProductsScreen
  {
    name: 'Products',
    component: ProductsScreen,
    options: {
      title: 'Ürünler',
      tabBarLabel: 'Ürünler',
      tabBarColor: '#F3533A',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} name="baby-carriage" color={color} />,
    },
  },
  // Orders Screen
  {
    name: 'Orders',
    component: OrdersScreen,
    options: {
      title: 'Siparişler',
      tabBarLabel: 'Siparişler',
      tabBarColor: '#FA9F42',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} name={focused ? 'box-open' : 'box'} color={color} />,
    },
  },
  // Exchanges Screen
  {
    name: 'Exchanges',
    component: ExchangesScreen,
    options: {
      title: 'Değişimler',
      tabBarLabel: 'Değişimler',
      tabBarColor: '#8AD879',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} name="sync-alt" color={color} />,
    },
  },
  // Chart Screen
  {
    name: 'Chart',
    component: ChartScreen,
    options: {
      title: 'Analiz',
      tabBarLabel: 'Analiz',
      tabBarColor: '#5ACFC9',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} name="chart-bar" color={color} />,
    },
  },
  // Profile Screen
  {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      title: 'Profil',
      tabBarLabel: 'Profil',
      tabBarColor: '#659EBF',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} name="user" color={color} />,
    },
  },
];


export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      activeColor={Colors.tabIconSelected}
      inactiveColor={Colors.tabIconDefault}
      barStyle={{ backgroundColor: purple }}
      sceneAnimationEnabled={false}
    >
      {screenInfo.flatMap((screen, index) => (
        <BottomTab.Screen
          name={screen.name}
          component={screen.component}
          options={{
            title: screen.options.title,
            tabBarLabel: screen.options.tabBarLabel,
            tabBarColor: screen.options.tabBarColor,
            tabBarIcon: screen.options.tabBarIcon,
          }}
          key={index}
        />
      ))}
    </BottomTab.Navigator>
  );
}
