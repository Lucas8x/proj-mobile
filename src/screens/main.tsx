import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';

import { Header } from '../components/Header';
import { PhotoCard } from '../components/PhotoCard';
import { PostController } from '../services/firebase';

export const Main = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [lastPost, setLastPost] = useState();
  const [loading, setLoading] = useState(false);

  async function loadPosts(lastPostItem: any = 0) {
    if (loading) return;
    setLoading(true);

    const { data, lastPost } = await PostController.getPosts({
      start: lastPostItem,
    });
    setLastPost(lastPost);

    setPosts([
      ...posts,
      ...Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
    ]);
    setLastPost(lastPost);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => <PhotoCard data={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<View />}
        onEndReached={() => loadPosts(lastPost)}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadPosts} />
        }
      />
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
