import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  data: {
    image_url: string;
    likes: number;
    user: {
      user_uid: string;
      name: string;
      avatar_url: string;
    };
  };
}

export function PhotoCard({ data, ...rest }: Props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  function handleNavigateToProfile() {
    navigation.navigate('Profile', { user_uid: data.user.user_uid });
  }

  function handleSharePhoto() {
    Share.share({
      message: data.image_url,
    });
  }

  function handleLike() {
    setLiked(!liked);
  }

  function handleNavigateComments() {}

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
          name='share'
          size={24}
          color='white'
          onPress={handleSharePhoto}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={!loading && styles.image}
          source={{ uri: data.image_url }}
          resizeMode='contain'
          onLoad={() => setLoading(false)}
        />
        {loading && <ActivityIndicator size='large' color='#333' />}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.footerButton} onPress={handleLike}>
            {!liked ? (<AntDesign name='hearto' size={24} color='white' />) : (
              <AntDesign name='heart' size={24} color='white' />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleNavigateComments}
          >
            <Feather name='message-circle' size={26} color='white' />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.likesText}>
            Curtido por{' '}
            <Text style={styles.boldText}>{data.likes} pessoas </Text>
          </Text>
          <Text style={styles.photoDescription}>
            <Text style={styles.boldText}>{data.user.name}</Text> photo
            description
          </Text>
          <Text style={styles.showAllComments} onPress={handleNavigateComments}>
            Ver todos os comentários
          </Text>
          {/* <Text style={styles.comments}>
            <Text style={styles.boldText}>some user</Text> another user comment
          </Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 600,
    borderStartColor: 'white',
    marginBottom: 80,
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

  imageContainer: {
    justifyContent: 'center',
    height: 500,
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 500,
    resizeMode: 'cover',
  },

  boldText: {
    fontWeight: 'bold',
  },

  footer: {
    height: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButton: {
    marginRight: 10,
  },
  likesText: {
    color: 'white',
  },
  photoDescription: {
    color: 'white',
  },
  showAllComments: {
    color: 'gray',
  },
  comments: {
    color: 'white',
  },
});
