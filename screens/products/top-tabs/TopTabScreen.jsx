import * as React from 'react';
import {
  Image, SafeAreaView, StyleSheet, TouchableOpacity,
  View, RefreshControl, AsyncStorage,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { width } from '../../../constants/Layout';
import { fetchAllProductsByCategory } from '../../../constants/fetchAPI/product';
import settings from '../../../constants/fetchAPI/config/base';

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


async function getAllProductsByCategory(categoryName) {
  console.log('helo');
  // initial variables
  let userToken;

  // get token
  try {
    userToken = await AsyncStorage.getItem('accessToken');
  } catch (e) {
    console.error(e);
  }

  // get & return products
  return fetchAllProductsByCategory(
    `${settings.prefix}://${settings.domain}`,
    categoryName,
    userToken,
  );
}

export default function TopFirstScreen({ navigation, route }) {
  const ref = React.useRef(null);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
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
    async function loadDataAsync() {
      const responseJSON = await getAllProductsByCategory(route.name);
      dispatch({ type: 'PRODUCTS', products: responseJSON });
    }
    loadDataAsync();
  }, [route.name]);

  const onRefresh = React.useCallback(
    async () => {
      dispatch({ type: 'REFRESH', isRefresh: true });
      const responseJSON = await getAllProductsByCategory(route.name);
      dispatch({ type: 'PRODUCTS', products: responseJSON });
      dispatch({ type: 'REFRESH', isRefresh: false });
    },
    [route.name],
  );

  useScrollToTop(ref);

  function formatData(funcData, funcNumColumns) {
    const numberOfFullRows = Math.floor(funcData.length / funcNumColumns);

    let numberOfElementsLastRow = funcData.length - (numberOfFullRows * funcNumColumns);
    while (numberOfElementsLastRow !== funcNumColumns && numberOfElementsLastRow !== 0) {
      funcData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return funcData;
  }

  function renderItemFunc({ item }) {
    if (item.empty === true) {
      return <View style={[styles.box, styles.boxInvisible]} />;
    }
    return (
      <TouchableOpacity
        key={item.pk}
        style={styles.box}
        onPress={() => {
          const colors = [];
          // eslint-disable-next-line react/prop-types
          item.color.forEach((element) => {
            colors.push(element.slug);
          });

          navigation.navigate('ProductDetails', {
            product: item,
            colors,
          });
        }}
      >
        <Image style={styles.boxImage} source={{ uri: item.productimage_set[0].image }} />
      </TouchableOpacity>
    );
  }
  renderItemFunc.propTypes = {
    item: PropTypes.shape({
      pk: PropTypes.number,
      product: PropTypes.string,
      productimage_set: PropTypes.string,
      empty: PropTypes.bool,
    }),
  };
  renderItemFunc.defaultProps = {
    item: {},
  };

  function keyExtractorFunc(item) {
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
        keyExtractor={keyExtractorFunc}
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
