import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

interface Params {
  post_id: string;
  user: {
    user_uid: string;
    name: string;
    avatar_url: string;
  };
}

interface Comment {}

export function Comments() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;
  const { post_id, user } = params;
  const [userInput, setUserInput] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);

  async function loadComments() {
    const response = [
      {
        id: '1',
        text: 'Lorem picsu',
      },
    ];
    setComments(response);
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  useEffect(() => {
    loadComments();
  }, [post_id]);

  async function sendComment() {
    console.log(userInput);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Ionicons name='arrow-back' size={28} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerName}>Comentários</Text>
      </View>

      <View style={styles.commentsContainer}>
        {comments.map((comment) => (
          <View style={styles.comment} key={comment.id}></View>
        ))}
        <Text>{post_id}</Text>
      </View>

      <View style={styles.footer}>
        <Image
          style={styles.avatar}
          source={{ uri: user.avatar_url }}
          resizeMode='contain'
          resizeMethod='resize'
        />
        <TextInput
          style={styles.input}
          placeholder='Escreva seu comentário...'
          onChangeText={setUserInput}
          placeholderTextColor={'#999'}
          autoCapitalize='sentences'
          multiline={true}
        />
        <TouchableOpacity onPress={sendComment} disabled={!userInput}>
          <Text style={styles.send}>Enviar</Text>
        </TouchableOpacity>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingTop: 10,
  },

  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 26,
  },

  commentsContainer: {
    flex: 1,
  },

  comment: {},

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#3C4043',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 18,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginHorizontal: 15,
  },

  send: {
    fontSize: 16,
    color: '#4A8AF4',
  },
});
