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

interface Params {
  user_id: number;
}

interface User {
  id: number;
  name: string;
  avatar_url: string;
  photos: Array<{
    id: number;
    url: string;
  }>;
}

export const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user_id } = route.params as Params;
  const [user, setUser] = useState<User>({} as User);

  async function loadUserData() {
    const user_data = {
      id: 123,
      name: 'Lucas',
      avatar_url: 'https://picsum.photos/100',
      photos: [
        { id: 1, url: 'https://picsum.photos/100/?random' },
        { id: 2, url: 'https://picsum.photos/100/?random' },
        { id: 3, url: 'https://picsum.photos/100/?random' },
        { id: 4, url: 'https://picsum.photos/100/?random' },
      ],
    };
    setUser(user_data);
  }

  useEffect(() => {
    loadUserData();
  }, []);

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
          source={{ uri: user.avatar_url }}
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
              source={{ uri: photo.url }}
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
