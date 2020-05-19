import * as React from 'react';
import {
  Image, SafeAreaView, StyleSheet,
  TouchableOpacity, View, RefreshControl,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import FuncContext from '../../../constants/products/FuncContext';
import StateContext from '../../../constants/products/StateContext';
import { width } from '../../../constants/Layout';

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


export default function TopFirstScreen({ navigation }) {
  const { categorizedProductList } = React.useContext(FuncContext);
  const { state, dispatch } = React.useContext(StateContext);
  const ref = React.useRef(null);

  React.useEffect(
    () => {
      async function loadDataAsync() {
        const responseJSON = await categorizedProductList();
        dispatch({ type: 'PRODUCTS', products: responseJSON });
      }
      loadDataAsync();
    },
    [],
  );

  const onRefresh = React.useCallback(
    async () => {
      dispatch({ type: 'REFRESH', isRefresh: true });
      const responseJSON = await categorizedProductList();
      dispatch({ type: 'PRODUCTS', products: responseJSON });
      dispatch({ type: 'REFRESH', isRefresh: false });
    },
    [state.refreshing],
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
        activeOpacity={0.5}
        onPress={() => navigation.navigate('ProductDetails')}
      >
        <Image style={styles.boxImage} source={{ uri: item.image }} />
      </TouchableOpacity>
    );
  }
  renderItemFunc.propTypes = {
    item: PropTypes.shape({
      pk: PropTypes.number,
      image: PropTypes.string,
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
        data={formatData(state.products_all, numColumns)}
        renderItem={renderItemFunc}
        numColumns={numColumns}
        keyExtractor={keyExtractorFunc}
        extraData={state.products_all}
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
