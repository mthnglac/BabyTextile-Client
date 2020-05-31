import * as React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
// import AuthContext from '../../constants/auth/AuthContext';

const white = '#fff';
// const greyDark = '#52575D';
// const greyLight = '#DFD8C8';
// const dark = '#41444B';
// const neonGreen = '#34FFB9';
// const grey = '#AEB5BC';
// const cream = '#CABFAB';
// const black = 'rgba(0, 0, 0, 0.38)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default function ProfileScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { signOut }: any = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Selam</Text>
    </View>
  );
}
