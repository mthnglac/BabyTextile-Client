import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  tabBar: {
    marginBottom: -3,
  },
});


export default function TabBarIcon(props) {
  const { name, color } = props;
  return (
    <FontAwesome5
      name={name}
      size={18}
      style={styles.tabBar}
      // color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      color={color}
    />
  );
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
