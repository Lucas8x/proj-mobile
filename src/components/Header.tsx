import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo.png';

export function Header() {
  const navigation = useNavigation();

  function handleNavigateToProfile() {
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} resizeMode='contain' />
      </View>
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleNavigateToProfile}
        >
          <Feather name='user' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0C0C0C',
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    borderBottomWidth: 0.3,
    borderBottomColor: 'white',
  },

  logoContainer: {},

  logo: {
    height: 60,
    width: 120,
  },

  headerButtonsContainer: {
    alignItems: 'flex-end',
  },

  headerButton: {},
});
