import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { TabBarIconType } from '../constants/types/Types';

const styles = StyleSheet.create({
  tabBar: {
    marginBottom: -3,
  },
});

export default function TabBarIcon(props: TabBarIconType): React.ReactElement {
  const { name, color } = props;
  return (
    <FontAwesome5
      name={name}
      size={18}
      style={styles.tabBar}
      color={color}
    />
  );
}
