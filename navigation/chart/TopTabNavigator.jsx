import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BestSellersScreen from '../../screens/chart/top-tabs/BestSellersScreen';
import YearlyScreen from '../../screens/chart/top-tabs/YearlyScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'BestSeller';
const screenInfo = [
  // BestSeller
  {
    name: 'BestSeller',
    component: BestSellersScreen,
    options: {
      title: 'EN ÇOK SATAN',
    },
  },
  // Yearly
  {
    name: 'Yearly',
    component: YearlyScreen,
    options: {
      title: 'AYLARA GÖRE SATIŞ',
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
