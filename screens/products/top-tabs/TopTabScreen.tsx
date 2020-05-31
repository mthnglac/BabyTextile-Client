import * as React from 'react';
import {
  Image, SafeAreaView, StyleSheet, TouchableOpacity,
  View, RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useScrollToTop } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import { ProductsProps } from '../../../constants/types/products/ProductTypes';
import { width } from '../../../constants/Layout';
import { fetchAllProductsByCategory } from '../../../constants/fetchAPI/product';
import settings from '../../../constants/fetchAPI/config/base';
import SignInScreen from '../../auth/SignInScreen';

type renderItemType = {
  item?: {
    pk: number;
    product: string;
    productimage_set: any[];
    empty: boolean;
    color: any[];
  };
}

const pink = 'pink';
const brown = '#4D243D';
const transparent = 'transparent';
const numColumns = 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pink,
  },
  box: {
    flex: 1,
    margin: 1,
    backgroundColor: brown,
    alignItems: 'center',
    justifyContent: 'center',
    height: width / numColumns, // approximate a square
  },
  boxImage: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
  boxInvisible: {
    backgroundColor: transparent,
  },
});


async function getAllProductsByCategory(categoryName: string): Promise<any> {
  console.log('helo');

  // get token
  const userToken = await AsyncStorage.getItem('accessToken');
  if (userToken === null) {
    return (
      <SignInScreen />
    );
  }
  // get & return products
  return fetchAllProductsByCategory(
    `${settings.prefix}://${settings.domain}`,
    categoryName,
    userToken,
  );
}

export default function TopTabScreen({ navigation, route }: ProductsProps): React.ReactElement {
  const ref = React.useRef(null);
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any): any => {
      switch (action.type) {
        case 'PRODUCTS':
          return {
            ...prevState,
            productsAllByCategory: action.products,
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
      productsAllByCategory: [],
      screenIsWaiting: false,
      refreshing: false,
    },
  );

  React.useEffect(() => {
    async function loadDataAsync(): Promise<any> {
      const responseJSON: any = await getAllProductsByCategory(route.name);
      dispatch({ type: 'PRODUCTS', products: responseJSON });
    }

    loadDataAsync();
  }, [route.name]);

  const onRefresh = React.useCallback(
    async (): Promise<any> => {
      dispatch({ type: 'REFRESH', isRefresh: true });
      const responseJSON = await getAllProductsByCategory(route.name);
      dispatch({ type: 'PRODUCTS', products: responseJSON });
      dispatch({ type: 'REFRESH', isRefresh: false });
    },
    [route.name],
  );

  useScrollToTop(ref);

  function formatData(funcData: any, funcNumColumns: number): any {
    const numberOfFullRows: number = Math.floor(funcData.length / funcNumColumns);

    let numberOfElementsLastRow: number = funcData.length - (numberOfFullRows * funcNumColumns);
    while (numberOfElementsLastRow !== funcNumColumns && numberOfElementsLastRow !== 0) {
      funcData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return funcData;
  }

  function renderItemFunc({ item }: renderItemType): React.ReactElement {
    if (item?.empty) {
      return <View style={[styles.box, styles.boxInvisible]} />;
    }
    return (
      <TouchableOpacity
        key={item?.pk}
        style={styles.box}
        onPress={() => {
          const colors: any[] = [];
          // eslint-disable-next-line no-unused-expressions
          item?.color.forEach((element: { slug: any }) => {
            colors.push(element.slug);
          });

          navigation.navigate('ProductDetails' as any, {
            product: item,
            colors,
          } as any);
        }}
      >
        <Image style={styles.boxImage} source={{ uri: item?.productimage_set[0].image }} />
      </TouchableOpacity>
    );
  }

  function keyExtractorFunc(item: any): number {
    // eslint-disable-next-line react/prop-types
    return item.pk;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        data={formatData(state.productsAllByCategory, numColumns)}
        renderItem={renderItemFunc}
        numColumns={numColumns}
        keyExtractor={keyExtractorFunc as any}
        extraData={state.productsAllByCategory}
        refreshControl={(
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={state.refreshing}
          />
        )}
      />
    </SafeAreaView>
  );
}
