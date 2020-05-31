import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import AuthContext from '../../constants/auth/AuthContext';

const white = '#fff';
const grey = '#a2a6ad';
const dark = '#343b45';
const yellow = '#ffb743';
const brownDark = 'rgba(255, 22, 84, 0.24)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark,
    paddingHorizontal: 30,
  },
  mainLogo: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // fontFamily: 'Avenir Next',
    fontFamily: 'space-mono',
    color: white,
  },
  loginText: {
    color: white,
    fontWeight: '600',
    fontSize: 16,
  },
  submitContainer: {
    backgroundColor: yellow,
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: brownDark,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  inputTextField: {
    marginTop: 32,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
    color: white,
    fontSize: 14,
    fontFamily: 'space-mono',
  },
  inputBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: grey,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default function SignInScreen(): React.ReactElement {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn }: any = React.useContext(AuthContext);
  const inputEl: any = React.useRef(null);

  return (
    <ScrollView style={styles.container}>
      {/* eslint-disable-next-line no-undef */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <View>
          <View style={styles.mainLogo}>
            {/* eslint-disable-next-line global-require */}
            <Image source={require('../../assets/images/signInScreen/logo.png')} />
            <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: '500' }]}>BabyTextile</Text>
          </View>
          <View style={styles.inputTextField}>
            <TextInput
              returnKeyType="next"
              style={styles.input}
              placeholder="Kullanıcı adı"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={() => inputEl.current.focus()}
            />
            <View style={styles.inputBorderBottom} />
          </View>
          <View style={styles.inputTextField}>
            <TextInput
              returnKeyType="done"
              style={styles.input}
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              ref={inputEl}
            />
            <View style={styles.inputBorderBottom} />
          </View>
          <RectButton style={styles.submitContainer} onPress={() => signIn({ username, password })}>
            <View accessible>
              <Text style={[styles.text, styles.loginText]}>Giriş Yap</Text>
            </View>
          </RectButton>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
