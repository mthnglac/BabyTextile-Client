import * as React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import AuthContext from './constants/auth/AuthContext';

import ImageModalScreen from './screens/modals/ImageModalScreen';
import SizeModalScreen from './screens/modals/SizeModalScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import SignInScreen from './screens/auth/SignInScreen';
import fetchJSONWebTokens from './constants/fetchAPI/token';
import checkError from './constants/Exceptions';
import settings from './constants/fetchAPI/config/base';

// initial
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Root';
const signInScreenInfo = {
  name: 'SignIn',
  component: SignInScreen,
  options: {
    headerShown: false,
  },
};
const screenInfo = [
  {
    name: 'Root',
    component: BottomTabNavigator,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ImageModal',
    component: ImageModalScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SizeModal',
    component: SizeModalScreen,
    options: {
      headerShown: false,
    },
  },
];
// style sheet
const white = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});


// eslint-disable-next-line no-unused-vars
export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
        default:
          return state;
      }
    },
    {
      isLoading: true,
      isSignOut: false,
      userToken: null,
    },
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let response;
        let accessToken;
        let refreshToken;
        try {
          response = await fetchJSONWebTokens(`${settings.prefix}://${settings.domain}`, data);
          ({ accessToken, refreshToken } = response);

          await AsyncStorage.multiSet([['accessToken', accessToken], ['refreshToken', refreshToken]]);
        } catch (e) {
          console.error(e);
          checkError(e);
        }
        dispatch({ type: 'SIGN_IN', token: accessToken });
      },
      signOut: async () => {
        try {
          const tokens = ['accessToken', 'refreshToken'];
          await AsyncStorage.multiRemove(tokens);
        } catch (e) {
          console.error(e);
          checkError(e);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
      // eslint-disable-next-line no-unused-vars
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );
  React.useEffect(() => {
    async function bootstrapAsync() {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }
    bootstrapAsync();
  }, []);


  if (!isLoadingComplete) {
    return null;
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            {
              state.userToken == null ? (
                <Stack.Screen
                  name={signInScreenInfo.name}
                  component={signInScreenInfo.component}
                  options={{
                    headerShown: signInScreenInfo.options.headerShown,
                  }}
                />
              ) : screenInfo.flatMap((screen, index) => (
                <Stack.Screen
                  name={screen.name}
                  component={screen.component}
                  options={{
                    headerShown: screen.options.headerShown,
                  }}
                  key={index}
                />
              ))
            }

            {/*{*/}
            {/*  screenInfo.flatMap((screen, index) => (*/}
            {/*    <Stack.Screen*/}
            {/*      name={screen.name}*/}
            {/*      component={screen.component}*/}
            {/*      options={{*/}
            {/*        headerShown: screen.options.headerShown,*/}
            {/*      }}*/}
            {/*      key={index}*/}
            {/*    />*/}
            {/*  ))*/}
            {/*}*/}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </View>
  );
}
