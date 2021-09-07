export interface IPhotoPost {
  id: string;
  likes: number;
  uri: string;
  user: {
    name: string;
    avatar: string;
  };
}
