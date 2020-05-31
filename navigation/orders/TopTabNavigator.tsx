import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { TopTabParamList } from '../../constants/types/orders/OrderTypes';
import AwaitingScreen from '../../screens/orders/top-tabs/AwaitingScreen';
import CompletedScreen from '../../screens/orders/top-tabs/CompletedScreen';
import RefundedScreen from '../../screens/orders/top-tabs/RefundedScreen';
import ShippedScreen from '../../screens/orders/top-tabs/ShippedScreen';

type ScreenInfo = {
  name: string;
  component: any;
  options: {
    title: string;
  };
}

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const INITIAL_ROUTE_NAME = 'Awaiting';
const screenInfo: ScreenInfo[] = [
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

export default function TopTabNavigator(): React.ReactElement {
  return (
    <TopTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {screenInfo.flatMap((screen: any, index: number) => (
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
