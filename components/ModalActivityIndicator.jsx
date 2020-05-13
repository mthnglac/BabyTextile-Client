import * as React from 'react';
import {
  ActivityIndicator, Text, View, Modal,
} from 'react-native';
import PropTypes from 'prop-types';

export default function ModalActivityIndicator(props) {
  const {
    show,
    color,
    backgroundColor,
    dimLights,
    loadingMessage,
  } = props;

  return (
    <Modal transparent animationType="none" visible={show}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}
      >
        <View
          style={{
            padding: 13,
            backgroundColor: `${backgroundColor}`,
            borderRadius: 13,
          }}
        >
          <ActivityIndicator animating={show} color={color} size="large" />
          <Text style={{ color: `${color}` }}>{loadingMessage}</Text>
        </View>
      </View>
    </Modal>
  );
}

ModalActivityIndicator.propTypes = {
  show: PropTypes.bool,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  dimLights: PropTypes.number,
  loadingMessage: PropTypes.string,
};

ModalActivityIndicator.defaultProps = {
  show: false,
  color: 'black',
  backgroundColor: 'white',
  dimLights: 0.6,
  loadingMessage: 'Doing stuff ...',
};
