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

import { MainStackParamList, AppScreenInfo } from './constants/types/Types';
import ImageModalScreen from './screens/modals/ImageModalScreen';
import SizeModalScreen from './screens/modals/SizeModalScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import SignInScreen from './screens/auth/SignInScreen';
import fetchJSONWebTokens from './constants/fetchAPI/token';
import checkError from './constants/Exceptions';
import settings from './constants/fetchAPI/config/base';

// initial
const Stack = createStackNavigator<MainStackParamList>();
const INITIAL_ROUTE_NAME = 'Root';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInScreenInfo = {
  name: 'SignIn',
  component: SignInScreen,
  options: {
    headerShown: false,
  },
};
const screenInfo: AppScreenInfo[] = [
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function App(props: any): React.ReactElement | null {
  const isLoadingComplete: boolean = useCachedResources();
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any): any => {
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
  const authContext: any = React.useMemo(
    () => ({
      signIn: async (data: any): Promise<any> => {
        let response: any;
        let accessToken: string;
        let refreshToken: string;
        try {
          response = await fetchJSONWebTokens(`${settings.prefix}://${settings.domain}`, data);
          ({ accessToken, refreshToken } = response);
          await AsyncStorage.multiSet([['accessToken', accessToken], ['refreshToken', refreshToken]]);
          dispatch({ type: 'SIGN_IN', token: accessToken });
        } catch (e) {
          // console.error(e);
          checkError(e);
        }
      },
      signOut: async (): Promise<any> => {
        try {
          const tokens = ['accessToken', 'refreshToken'];
          await AsyncStorage.multiRemove(tokens);
        } catch (e) {
          // console.error(e);
          checkError(e);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    [],
  );
  React.useEffect(() => {
    async function bootstrapAsync(): Promise<void> {
      let userToken: string | null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } catch (e) {
        console.error(e);
      }
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
            {/*{*/}
            {/*  state.userToken == null ? (*/}
            {/*    <Stack.Screen*/}
            {/*      name={signInScreenInfo.name}*/}
            {/*      component={signInScreenInfo.component}*/}
            {/*      options={{*/}
            {/*        headerShown: signInScreenInfo.options.headerShown,*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  ) : screenInfo.flatMap((screen, index) => (*/}
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

            {
              screenInfo.flatMap((screen: any, index: number) => (
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
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </View>
  );
}
