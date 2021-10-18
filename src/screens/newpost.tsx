import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export function NewPost() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [photos, setPhotos] = useState<MediaLibrary.AssetInfo[]>();

  function handleNavigateBack() {
    navigation.goBack();
  }

  async function askPermission() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da sua permisão para essa funcionalidade!');
      return;
    }
    setHasPermission(true);
  }

  async function loadPhotos() {
    if (!hasPermission) return;

    const userPhotos = await MediaLibrary.getAssetsAsync({
      first: 20,
      album: await MediaLibrary.getAlbumAsync('Camera'),
      sortBy: [MediaLibrary.SortBy.creationTime],
      mediaType: ['photo'],
    });
    setPhotos(userPhotos.assets);
  }

  useEffect(() => {
    askPermission();
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [hasPermission]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name='x' size={26} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerNewPostText}>Nova publicação</Text>
        <TouchableOpacity>
          <Feather name='arrow-right' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.photoList}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1,
              }}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    height: 50,
    marginHorizontal: 13,
  },
  headerNewPostText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  photoList: {
    justifyContent: 'center',
  },

  photos: {},

  image: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
