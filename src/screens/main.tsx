import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { Header } from '../components/Header';
import { PhotoCard } from '../components/PhotoCard';
import { IPhotoPost } from '../interfaces/IPhotoPost';

export const Main = () => {
  const [posts, setPosts] = useState<IPhotoPost[]>([]);

  useEffect(() => {
    async function loadPosts() {
      setPosts([
        {
          id: 'abc123',
          likes: 0,
          uri: 'https://picsum.photos/1000/1350',
          user: {
            name: 'Lucas',
            avatar: 'https://picsum.photos/40',
          },
        },
        {
          id: 'def456',
          likes: 0,
          uri: 'https://picsum.photos/1001/1351',
          user: {
            name: 'Carlos',
            avatar: 'https://picsum.photos/41',
          },
        },

        {
          id: 'aaaa',
          likes: 0,
          uri: 'https://picsum.photos/1002/1351',
          user: {
            name: 'Cleiton',
            avatar: 'https://picsum.photos/42',
          },
        },
      ]);
    }
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
    marginHorizontal: 15,
  },
});
