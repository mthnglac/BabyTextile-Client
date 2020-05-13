import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabScreen from '../../screens/products/top-tabs/TopTabScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Bathrobe';
const screenInfo = [
  // TopFirst
  {
    name: 'Bathrobe',
    component: TopTabScreen,
    options: {
      title: 'Bornoz',
    },
  },
  // TopSecond
  {
    name: 'Pyjamas',
    component: TopTabScreen,
    options: {
      title: 'Pijama',
    },
  },
  // TopThird
  {
    name: 'Hat',
    component: TopTabScreen,
    options: {
      title: 'Şapka',
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
