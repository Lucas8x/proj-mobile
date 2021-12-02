import firebase from 'firebase';
import { Alert, Platform } from 'react-native';
import uuid from 'uuid';
import * as MediaLibrary from 'expo-media-library';
import { INewPost, IPost } from '../interfaces';
import { postView } from '../utils/postView';
import { getImageUrl } from '../utils';

interface newUserProps {
  uid?: string;
  name: string;
  avatar_url: string;
}

export async function writeUserData({ uid, name, avatar_url }: newUserProps) {
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .set({ name, avatar_url });
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUserUid(): Promise<string | undefined> {
  const user_uid = firebase.auth().currentUser?.uid;
  return user_uid;
}

async function uriToBlob(uri: string): Promise<Blob> {
  const repsonse = await fetch(uri);
  const blob = await repsonse.blob();
  return blob;
}

async function uploadToFirebase(
  blob: any
): Promise<firebase.storage.UploadTaskSnapshot> {
  return new Promise((resolve, reject) => {
    const photoUid = uuid.v4();
    const usersPhotosStorage = firebase.storage().ref('photos');
    usersPhotosStorage
      .child(photoUid)
      .put(blob, {
        contentType: 'image/jpeg',
      })
      .then((snapshot) => {
        blob.close();
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function uploadPhoto(image: MediaLibrary.AssetInfo): Promise<string> {
  const { uri } = image;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  const blob = await uriToBlob(uploadUri);
  const photoRef = await uploadToFirebase(blob);
  const image_id = photoRef.metadata.name;

  Alert.alert('Successfully uploaded photo!');
  return image_id;
}

export const PostController = {
  async getPost(post_id: string): Promise<any> {
    const post = await firebase
      .firestore()
      .collection('user_photos')
      .doc(post_id)
      .get();
    return post.data();
  },

  async getPosts({ start }): Promise<any> {
    let ref = firebase
      .firestore()
      .collection('user_photos')
      .orderBy('timestamp', 'desc')
      .limit(5);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const posts = await ref.get();
      const lastPost = posts.docs[posts.docs.length - 1];

      return {
        data: await Promise.all(
          posts.docs.map(async (doc) => await postView(doc))
        ),
        lastPost: lastPost,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getUserPosts(user_uid: string): Promise<any[]> {
    const posts = await firebase
      .firestore()
      .collection('user_photos')
      .where('user_uid', '==', user_uid)
      .get();

    return await Promise.all(
      posts.docs.map(async (doc) => ({
        id: doc.id,
        image_url: await getImageUrl(doc.data().image_id),
      }))
    );
  },

  async createPost({ image, description }: INewPost): Promise<void> {
    try {
      const currentUserUid = await getCurrentUserUid();

      if (!currentUserUid) {
        Alert.alert('You must be logged in to upload a photo');
        return;
      }

      const image_id = await uploadPhoto(image);
      const post = {
        image_id,
        description,
        likes: 0,
        user_uid: currentUserUid,
        timestamp: Date.now(),
      };

      firebase.firestore().collection('user_photos').add(post);
    } catch (error) {
      console.log(error);
    }
  },

  async deletePost({ post_id }: { post_id: string }) {
    try {
      const currentUserUid = await getCurrentUserUid();

      if (!currentUserUid) {
        Alert.alert('You must be logged in to delete a photo');
        return;
      }

      const { image_id, user_uid } = await this.getPost(post_id);

      if (user_uid !== currentUserUid) return;

      const usersPhotosCollection = firebase
        .firestore()
        .collection('user_photos');
      const usersPhotosStorage = firebase.storage().ref('photos');

      await usersPhotosStorage.child(image_id).delete();
      usersPhotosCollection.doc(post_id).delete();
    } catch (error) {
      console.log(error);
    }
  },
};
