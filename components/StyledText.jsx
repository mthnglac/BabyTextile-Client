import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  styledText: {
    fontFamily: 'space-mono',
  },
});

export default function MonoText(props) {
  const { style } = props;
  return <Text style={[style, styles.styledText]} />;
}

MonoText.propTypes = {
  style: PropTypes.string.isRequired,
};
