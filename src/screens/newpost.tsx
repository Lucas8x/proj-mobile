import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Feather, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { PostController } from '../services/firebase';

export function NewPost() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [userPhotos, setUserPhotos] = useState<MediaLibrary.AssetInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<MediaLibrary.AssetInfo>();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

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

    const photos = await MediaLibrary.getAssetsAsync({
      first: 20,
      album: await MediaLibrary.getAlbumAsync('Camera'),
      sortBy: [MediaLibrary.SortBy.creationTime],
      mediaType: ['photo'],
    });
    setUserPhotos(photos.assets);
  }

  function handleSelectPhoto(photo: MediaLibrary.AssetInfo) {
    setSelectedImage(selectedImage === photo ? undefined : photo);
  }

  async function handleUploadPhoto() {
    if (!selectedImage) return;

    setUploading(true);
    await PostController.createPost({ image: selectedImage, description: '' });
    setUploading(false);
  }

  async function getAlbums() {
    const a = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true });
    console.log(a.map((a) => a.title));
  }

  useEffect(() => {
    askPermission();
    //getAlbums();
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [hasPermission]);

  const photoSquare = (item: MediaLibrary.AssetInfo) => (
    <TouchableOpacity
      onPress={() => handleSelectPhoto(item)}
      style={[selectedImage?.id === item.id ? styles.selectedImage : {}]}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

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

      <FlatGrid
        data={userPhotos}
        spacing={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => photoSquare(item)}
      />

      {selectedImage ? (
        <TouchableOpacity
          onPress={handleUploadPhoto}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
        >
          <Ionicons name='send' size={30} color='black' />
        </TouchableOpacity>
      ) : null}
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

  selectedImage: {
    borderColor: '#00c118',
    borderWidth: 1,
  },
  image: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
