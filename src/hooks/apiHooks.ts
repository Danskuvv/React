import {MediaItem, MediaItemWithOwner} from '../types/DBTypes';
import {useEffect, useState} from 'react';
import { fetchData } from '../functions';
// DONE: add necessary imports
const useMedia = () => {
  // DONE: move mediaArray state here
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);


  // DONE: move getMedia function here
  // DONE: move useEffect here

  const getMediaWithOwners = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(`${import.meta.env.VITE_MEDIA_API}/media`);
      const mediaItemsWithOwners: Promise<MediaItemWithOwner>[] = mediaItems.map(async (item) => {
        const userData = await fetchData<{ username: string }>(`${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`);
        return { ...item, username: userData.username };
      });
      const result = await Promise.all(mediaItemsWithOwners);
      console.log(result); // Log the array of media items with owners
      setMediaArray(result);
    } catch (error) {
      console.error('getMediaWithOwners', error);
    }
  };

  useEffect(() => {
    getMediaWithOwners();
  }, []);

  return {mediaArray};
  };

  export {useMedia};
