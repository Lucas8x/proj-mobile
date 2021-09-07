import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: 'Lucas',
    avatar: 'https://picsum.photos/100',
    photos: [
      { id: 1, uri: 'https://picsum.photos/100' },
      { id: 2, uri: 'https://picsum.photos/101' },
      { id: 3, uri: 'https://picsum.photos/102' },
      { id: 4, uri: 'https://picsum.photos/103' },
    ],
  });

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowBack}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Ionicons name='arrow-back' size={28} color='white' />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerName}>Profile</Text>
        <View />
      </View>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: user.avatar }}
          resizeMode='contain'
          resizeMethod='resize'
        />
        <Text style={styles.username}>
          <Text style={styles.bold}>{user.name}</Text>'s profile
        </Text>
      </View>
      <View style={styles.userPhotosContainer}>
        {user.photos &&
          user.photos.map((photo, index) => (
            <Image
              style={styles.photo}
              key={index}
              source={{ uri: photo.uri }}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    borderBottomWidth: 0.3,
    borderBottomColor: 'white',
    paddingBottom: 10,
    paddingTop: 10,
  },

  arrowBack: { alignItems: 'flex-start' },

  headerName: {
    fontSize: 18,
    color: 'white',
    marginRight: 25,
  },

  userInfo: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },

  username: {
    marginLeft: 20,
    color: 'white',
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },

  userPhotosContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    borderBottomColor: '#ddd',
  },
  photo: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
});
