import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { TopTabParamList } from '../../constants/types/products/ProductTypes';
import TopTabScreen from '../../screens/products/top-tabs/TopTabScreen';

type ScreenInfo = {
  name: string;
  component: any;
  options: {
    title: string;
  };
}

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const INITIAL_ROUTE_NAME = 'Bornoz';
const screenInfo: ScreenInfo[] = [
  // TopFirst
  {
    name: 'Bornoz',
    component: TopTabScreen,
    options: {
      title: 'Bornoz',
    },
  },
  // TopSecond
  {
    name: 'Pijama',
    component: TopTabScreen,
    options: {
      title: 'Pijama',
    },
  },
  // TopThird
  {
    name: 'Şapka',
    component: TopTabScreen,
    options: {
      title: 'Şapka',
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
