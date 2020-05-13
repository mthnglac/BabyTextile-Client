import * as React from 'react';
import {
  AsyncStorage, Image, SafeAreaView, StyleSheet,
  TouchableOpacity, View, Dimensions,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { fetchAllProductFirstImages } from '../../../constants/fetchAPI/product';
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
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  boxImage: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
  boxInvisible: {
    backgroundColor: transparent,
  },
});

async function getAllProductFirstImages() {
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
}

export default function TopFirstScreen({ navigation }) {
  const ref = React.useRef(null);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'PRODUCTS':
          return {
            ...prevState,
            products_all: action.products,
          };
        case 'asd':
          return {
            ...prevState,
            products_all: action.products,
          };
        case 'PROffafaDUCTS':
          return {
            ...prevState,
            products_all: action.products,
          };
        default:
          return state;
      }
    },
    {
      products_all: [],
    },
  );

  React.useEffect(
    // eslint-disable-next-line react/prop-types
    () => navigation.addListener('focus', async () => {
      const responseJSON = await getAllProductFirstImages();
      dispatch({ type: 'PRODUCTS', products: responseJSON });
    }),
    [],
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
      />
    </SafeAreaView>
  );
}
