import { IPhotoPost } from '../interfaces/IPhotoPost';

export function getPhotos(x: number): Array<IPhotoPost> {
  const items = [];
  for (let i = 0; i < x; i++) {
    const random_id = Math.random().toString(36).substring(7);
    items.push({
      id: random_id,
      likes: 0,
      url: `https://picsum.photos/1000/1350?random=${random_id}`,
      user: {
        id: Math.floor(Math.random() * (9999 - 0 + 1) + 0),
        name: ['Lucas', 'Cleiton', 'Carlos', 'Luiz', 'Mauro'][
          Math.floor(Math.random() * 5)
        ],
        avatar_url: `https://picsum.photos/40?random=${random_id}`,
      },
    });
  }
  return items;
}
