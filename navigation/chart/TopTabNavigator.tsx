import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { TopTabParamList } from '../../constants/types/chart/ChartTypes';
import BestSellersScreen from '../../screens/chart/top-tabs/BestSellersScreen';
import YearlyScreen from '../../screens/chart/top-tabs/YearlyScreen';

type ScreenInfo = {
  name: string;
  component: any;
  options: {
    title: string;
  };
}

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const INITIAL_ROUTE_NAME = 'BestSeller';
const screenInfo: ScreenInfo[] = [
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
