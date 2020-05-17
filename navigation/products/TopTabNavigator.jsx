import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabScreen from '../../screens/products/top-tabs/TopTabScreen';
import { fetchAllProductFirstImages } from '../../constants/fetchAPI/product';
import settings from '../../constants/fetchAPI/config/base';
import FuncContext from '../../constants/products/FuncContext';
import StateContext from '../../constants/products/StateContext';

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
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'PRODUCTS':
          return {
            ...prevState,
            products_all: action.products,
          };
        case 'REFRESH':
          return {
            ...prevState,
            refreshing: action.isRefresh,
          };
        case 'INDICATOR':
          return {
            ...prevState,
            screenIsWaiting: action.isFinished,
          };
        default:
          return state;
      }
    },
    {
      products_all: [],
      screenIsWaiting: false,
      refreshing: false,
    },
  );
  const funcContext = React.useMemo(
    () => ({
      categorizedProductList: async () => {
        console.log('hello');
        // initial variables
        let userToken;

        // get token
        try {
          userToken = await AsyncStorage.getItem('accessToken');
        } catch (e) {
          console.error(e);
        }

        // get & return products
        return fetchAllProductFirstImages(
          `${settings.prefix}://${settings.domain}`,
          userToken,
        );
      },
    }),
    [],
  );

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <FuncContext.Provider value={funcContext}>
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
      </FuncContext.Provider>
    </StateContext.Provider>
  );
}
