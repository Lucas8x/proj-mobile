import { IUser } from './IUser';

export interface IPhotoPost {
  id: string;
  likes: number;
  url: string;
  user: IUser;
}
