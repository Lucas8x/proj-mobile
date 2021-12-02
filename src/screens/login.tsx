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
import firebase from 'firebase';

import Logo from '../assets/logo.png';

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email obrigatório'),
    password: Yup.string()
      .min(6, 'Senha mínimo de 6 caracteres')
      .required('Senha obrigatória'),
  });

  async function validateForm() {
    schema.validate({ email, password }, { abortEarly: false }).catch((err) => {
      err.errors.length == 1
        ? setError(err.message)
        : setError('Preencha todos os campos');
    });
    return await schema.isValid({ email, password });
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    const isValid = await validateForm();
    if (isValid) {
      setError('');
      Keyboard.dismiss();

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setIsSubmitting(false);
          ToastAndroid.show('Bem-Vindo', ToastAndroid.SHORT);
          navigation.navigate('Main' as never, {} as never);
        })
        .catch(() => {
          ToastAndroid.show(
            'Não foi possivel realizar o login',
            ToastAndroid.SHORT
          );
        });
    }
    setIsSubmitting(false);
  }

  function handlePasswordForgot() {
    //navigation.navigate('');
  }

  function navigateToRegister() {
    navigation.navigate('Signup' as never, {} as never);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} resizeMode='contain' />
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

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
          containerStyle={styles.loginButton}
          title={'Entrar'}
          loading={isSubmitting}
          onPress={handleSubmit}
        />
        <Text style={styles.passwordForgot} onPress={handlePasswordForgot}>
          Esqueceu a senha?
        </Text>
      </View>

      <View style={styles.singupContainer}>
        <Text style={styles.singupText} onPress={navigateToRegister}>
          Não tem conta? <Text style={styles.singupTextBold}>Registre-se</Text>
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

  errorContainer: {
    width: '70%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  errorText: {
    padding: 5,
    color: '#FFFFFF',
    fontWeight: 'bold',
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

  loginButton: {
    marginTop: 20,
    width: '70%',
  },

  passwordForgot: {
    marginTop: 20,
    color: '#1891F8',
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
