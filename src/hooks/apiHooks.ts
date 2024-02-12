import {MediaItem, MediaItemWithOwner} from '../types/DBTypes';
import {useEffect, useState} from 'react';
import { fetchData } from '../functions';
import { Credentials } from '../types/localTypes';
import { LoginResponse, UserResponse } from '../types/MessageTypes';
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


  const useAuthentication = () => {
    const postLogin = async (creds: Credentials) => {
      try {
        return await fetchData<LoginResponse>(
          import.meta.env.VITE_AUTH_API + '/auth/login',
          {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    };

    return {postLogin};
  };

  const useUser = () => {
    // TODO: implement network functions for auth server user endpoints
    const getUserByToken = async (token: string) => {
      const options = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users/token/',
        options,
      );

    };

    const postUser = async (user: Record<string, string>) => {
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };

      await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users',
        options,
      );
    };

    return {getUserByToken, postUser};


  };
  export {useMedia, useAuthentication, useUser};
