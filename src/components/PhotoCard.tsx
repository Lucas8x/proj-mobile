import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { IPhotoPost } from '../interfaces/IPhotoPost';

interface PhotoCard {
  data: IPhotoPost;
}

export function PhotoCard({ data, ...rest }: PhotoCard) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: data.user.avatar }}
            resizeMode='contain'
            resizeMethod='resize'
          />
          <Text style={styles.username}>{data.user.name}</Text>
        </View>

        <Entypo name='dots-three-horizontal' size={20} color='white' />
      </View>
      <Image
        style={styles.image}
        source={{ uri: data.uri }}
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
