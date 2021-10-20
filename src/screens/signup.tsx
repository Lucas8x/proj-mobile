import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';

import Logo from '../assets/logo.png';

export function SingUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    Keyboard.dismiss();
    await new Promise((resolve) => setTimeout(resolve, 4000));
    ToastAndroid.show('Registrado com Sucesso', ToastAndroid.SHORT);
    setIsSubmitting(false);
    navigateToLogin();
  }

  function navigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} resizeMode='contain' />
        <TextInput
          style={styles.input}
          placeholder='Digite seu Nome'
          onChangeText={setName}
          placeholderTextColor={'#999'}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Digite seu Email'
          onChangeText={setEmail}
          placeholderTextColor={'#999'}
          autoCapitalize='none'
          keyboardType='email-address'
        />

        <TextInput
          style={styles.input}
          placeholder='Digite sua Senha'
          onChangeText={setPassword}
          placeholderTextColor={'#999'}
          autoCapitalize='none'
          secureTextEntry
        />
        <Button
          containerStyle={styles.registerButton}
          title={'Registrar'}
          loading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>

      <View style={styles.singupContainer}>
        <Text style={styles.singupText} onPress={navigateToLogin}>
          Já possui conta? <Text style={styles.singupTextBold}>Entre</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0C0C',
  },

  logo: {
    marginBottom: 50,
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.4,
  },

  input: {
    width: '70%',
    height: 48,
    marginTop: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16,
    color: '#FFFFFF',
    paddingLeft: 15,
  },

  registerButton: {
    marginTop: 20,
    width: '70%',
  },

  singupContainer: {
    width: '100%',
    height: 30,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
  },
  singupText: {
    color: '#999999',
  },
  singupTextBold: {
    fontWeight: 'bold',
    color: '#999999',
  },
});
