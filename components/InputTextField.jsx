import * as React from 'react';
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const grey = '#ABB4BD';
const greyLight = '#D8D8D8';
const black = '#1D2029';
const styles = StyleSheet.create({
  inputTitle: {
    color: grey,
    fontSize: 14,
  },
  input: {
    paddingVertical: 12,
    color: black,
    fontSize: 14,
    // fontFamily: 'Avenir Next',
    fontFamily: 'space-mono',
  },
  inputBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: greyLight,
  },
});

export default function InputTextField(props) {
  const {
    style,
    title,
    isSecure,
    placeholderText,
  } = props;
  return (
    <View style={style}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        secureTextEntry={isSecure}
        style={styles.input}
        placeholder={placeholderText}
      />
      <View style={styles.inputBorderBottom} />
    </View>
  );
}

InputTextField.propTypes = {
  isSecure: PropTypes.string,
  style: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
};

InputTextField.defaultProps = {
  isSecure: false,
  style: null,
};
