import firebase from 'firebase';

export async function getImageUrl(image_id: string): Promise<string> {
  const usersPhotosStorage = firebase.storage().ref('photos');
  const url = await usersPhotosStorage.child(image_id).getDownloadURL();
  return url;
}

export async function getUserInfo(user_uid: string): Promise<any> {
  const userInfo = await firebase
    .firestore()
    .collection('users')
    .doc(user_uid)
    .get();
  return userInfo.data();
}
