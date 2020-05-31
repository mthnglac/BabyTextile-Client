import { Alert } from 'react-native';

export default function oneButtonAlert(title: string, message: string, btnText: string) {
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
