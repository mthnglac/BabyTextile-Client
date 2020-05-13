import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AwaitingScreen from '../../screens/exchanges/top-tabs/AwaitingScreen';
import CompletedScreen from '../../screens/exchanges/top-tabs/CompletedScreen';
import RefundedScreen from '../../screens/exchanges/top-tabs/RefundedScreen';
import ShippedScreen from '../../screens/exchanges/top-tabs/ShippedScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Awaiting';
const screenInfo = [
  // Awaiting
  {
    name: 'Awaiting',
    component: AwaitingScreen,
    options: {
      title: 'BEKLEYEN',
    },
  },
  // Shipped
  {
    name: 'Shipped',
    component: ShippedScreen,
    options: {
      title: 'KARGODA',
    },
  },
  // Completed
  {
    name: 'Completed',
    component: CompletedScreen,
    options: {
      title: 'ULAŞAN',
    },
  },
  // Refunded
  {
    name: 'Refunded',
    component: RefundedScreen,
    options: {
      title: 'DÖNEN',
    },
  },
];

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {screenInfo.flatMap((screen, index) => (
        <TopTab.Screen
          name={screen.name}
          component={screen.component}
          options={{
            title: screen.options.title,
          }}
          key={index}
        />
      ))}
    </TopTab.Navigator>
  );
}
