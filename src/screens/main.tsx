import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { Header } from '../components/Header';
import { PhotoCard } from '../components/PhotoCard';
import { IPhotoPost } from '../interfaces/IPhotoPost';
import { getPhotos } from '../services/fakeApi';

export const Main = () => {
  const [posts, setPosts] = useState<IPhotoPost[]>([]);

  async function loadPosts() {
    const response = getPhotos(10);
    setPosts([...posts, ...response]);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <PhotoCard data={item} />}
          contentContainerStyle={styles.list}
          ListHeaderComponent={<View />}
          onEndReached={loadPosts}
          onEndReachedThreshold={0.2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
  },

  list: {
    marginTop: 10,
    marginBottom: 50,
  },
});
