import * as React from 'react';
import {
  ActivityIndicator, Text, View, Modal,
} from 'react-native';

type Props = {
    show: boolean;
    color: string;
    backgroundColor: string;
    dimLights: number;
    loadingMessage: string;
}

export default function ModalActivityIndicator(props: Props): React.ReactElement {
  const {
    show = false,
    color = 'black',
    backgroundColor = 'white',
    dimLights = 0.6,
    loadingMessage = 'Doing stuff ...',
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
