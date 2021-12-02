import * as MediaLibrary from 'expo-media-library';

export interface IUser {
  id: number;
  name: string;
  avatar_url: string;
}

export interface INewPost {
  image: MediaLibrary.AssetInfo;
  description: string;
}

export interface IPost {
  id: string;
  image_uid: string;
  description: string;
  likes: number;
  user_id: string;
  timestamp: Date;
}

export interface IPhotoPost extends IPost {
  user: IUser;
}
