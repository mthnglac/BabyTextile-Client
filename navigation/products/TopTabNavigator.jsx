import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopFirstScreen from '../../screens/products/top-tabs/TopFirstScreen';
import TopSecondScreen from '../../screens/products/top-tabs/TopSecondScreen';
import TopThirdScreen from '../../screens/products/top-tabs/TopThirdScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'TopFirstScreen';
const screenInfo = [
  // TopFirst
  {
    name: 'Bathrobe',
    component: TopFirstScreen,
    options: {
      title: 'Bornoz',
    },
  },
  // TopSecond
  {
    name: 'Pyjamas',
    component: TopSecondScreen,
    options: {
      title: 'Pijama',
    },
  },
  // TopThird
  {
    name: 'Hat',
    component: TopThirdScreen,
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
