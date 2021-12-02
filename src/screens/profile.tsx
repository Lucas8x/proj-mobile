import React, { useEffect, useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase';
import { PostController } from '../services/firebase';
import { getUserInfo } from '../utils';

interface Params {
  user_uid: string;
}

interface User {
  name: string;
  avatar_url: string;
}

interface Photos {
  id: string;
  image_url: string;
}

export const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;
  const user_uid = params.user_uid || firebase.auth().currentUser?.uid || '';
  const [user, setUser] = useState<User>({} as User);
  const [photos, setPhotos] = useState<Photos[]>([]);

  async function loadUserData() {
    const user_data = await getUserInfo(user_uid);
    setUser(user_data);
  }

  async function getUserPhotos() {
    const user_photos = await PostController.getUserPosts(user_uid);
    setPhotos(user_photos);
  }

  useEffect(() => {
    loadUserData();
    getUserPhotos();
  }, [user_uid]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleLogout() {
    firebase.auth().signOut();
    navigation.navigate('Login' as never, {} as never);
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
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name='exit-outline' size={28} color='white' />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: user.avatar_url }}
          resizeMode='contain'
          resizeMethod='resize'
        />
        <Text style={styles.username}>
          <Text style={styles.bold}>{user.name}</Text>'s profile
        </Text>
      </View>
      <View style={styles.userPhotosContainer}>
        {photos &&
          photos.map((photo, index) => (
            <Image
              style={styles.photo}
              key={index}
              source={{ uri: photo.image_url }}
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
    backgroundColor: '#ddd',
  },
});
