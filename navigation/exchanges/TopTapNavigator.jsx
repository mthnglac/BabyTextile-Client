import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AwaitingScreen from '../../screens/exchanges/top-tabs/AwaitingScreen';
import CompletedScreen from '../../screens/exchanges/top-tabs/CompletedScreen';
import RefundedScreen from '../../screens/exchanges/top-tabs/RefundedScreen';
import ShippedScreen from '../../screens/exchanges/top-tabs/ShippedScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Awaiting';

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <TopTab.Screen
        name="Awaiting"
        component={AwaitingScreen}
        options={{
          title: 'BEKLEYEN',
        }}
      />
      <TopTab.Screen
        name="Shipped"
        component={ShippedScreen}
        options={{
          title: 'KARGODA',
        }}
      />
      <TopTab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{
          title: 'ULAŞAN',
        }}
      />
      <TopTab.Screen
        name="Refunded"
        component={RefundedScreen}
        options={{
          title: 'DÖNEN',
        }}
      />
    </TopTab.Navigator>
  );
}
