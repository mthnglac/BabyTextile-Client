import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BestSellersScreen from '../../screens/chart/top-tabs/BestSellersScreen';
import YearlyScreen from '../../screens/chart/top-tabs/YearlyScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'BestSeller';

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <TopTab.Screen
        name="BestSeller"
        component={BestSellersScreen}
        options={{
          title: 'EN ÇOK SATAN',
        }}
      />
      <TopTab.Screen
        name="Yearly"
        component={YearlyScreen}
        options={{
          title: 'AYLARA GÖRE SATIŞ',
        }}
      />
    </TopTab.Navigator>
  );
}
