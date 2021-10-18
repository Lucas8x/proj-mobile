import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { IPhotoPost } from '../interfaces/IPhotoPost';

interface PhotoCard {
  data: IPhotoPost;
}

export function PhotoCard({ data, ...rest }: PhotoCard) {
  const navigation = useNavigation();

  function handleNavigateToProfile() {
    navigation.navigate('Profile', { user_id: data.user.id });
  }

  function handleSharePhoto() {
    Share.share({
      message: data.url,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={handleNavigateToProfile}
        >
          <Image
            style={styles.avatar}
            source={{ uri: data.user.avatar_url }}
            resizeMode='contain'
            resizeMethod='resize'
          />
          <Text style={styles.username}>{data.user.name}</Text>
        </TouchableOpacity>

        <Entypo
          name='dots-three-horizontal'
          size={20}
          color='white'
          onPress={handleSharePhoto}
        />
      </View>
      <Image
        style={styles.image}
        source={{ uri: data.url }}
        resizeMode='contain'
      />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 500,
    borderStartColor: 'white',
    marginBottom: 100,
  },

  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },

  userInfo: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 18,
  },
  username: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15,
  },

  image: {
    width: '100%',
    height: '100%',
    maxHeight: 500,
    resizeMode: 'cover',
  },

  footer: {},
});
