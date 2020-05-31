import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      initialRouteName: 'profile',
      screens: {
        Products: 'products',
        Orders: 'orders',
        Exchanges: 'exchanges',
        Chart: 'chart',
        Profile: {
          path: 'user/:id',
          parse: {
            id: (id) => `there, ${id}`,
          },
        },
      },
    },
  },
};
