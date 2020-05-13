import { Alert } from 'react-native';

export default function oneButtonAlert(title, message, btnText) {
  return (
    Alert.alert(
      title,
      message,
      [
        {
          text: btnText,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  );
}
