import uuid from 'uuid';

import { getImageUrl, getUserInfo } from '../utils';

interface IPostView {
  id: string;
  post_id: string;
  image_url: string;
  description: string;
  likes: number;
  timestamp: Date;
  user: {
    user_uid: string;
  };
}

export async function postView(doc): Promise<IPostView> {
  const post = doc.data();
  return {
    id: uuid.v4(),
    post_id: doc.id,
    image_url: await getImageUrl(post.image_id),
    description: post.description,
    likes: post.likes,
    timestamp: post.timestamp,
    user: {
      user_uid: post.user_uid,
      ...(await getUserInfo(post.user_uid)),
    },
  };
}
