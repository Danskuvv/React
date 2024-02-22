import { useEffect, useReducer } from "react";
import { useUserContext } from "../hooks/ContextHooks";
import { Like, MediaItemWithOwner } from "../types/DBTypes";
import { useLike } from "../hooks/apiHooks";

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
    default:
      return state; // Return the unchanged state if the action type is not recognized
  }
}



const Likes = ({item}: {item: MediaItemWithOwner}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {user} = useUserContext();
  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();
  console.log('Likes');

  // get user like
const getLikes = async () => {
  const token = localStorage.getItem('token');
  if (!item || !token) {
    return;
  }
  try {
    const userLike = await getUserLike(item.media_id, token);
    likeDispatch({type: 'like', like: userLike});
  } catch (e) {
    likeDispatch({type: 'like', like: null});
    console.log('get user like error', (e as Error).message);
  }
};

// get like count
const getLikeCount = async () => {
  try {
    const countResponse = await getCountByMediaId(item.media_id);
    likeDispatch({type: 'setLikeCount', count: countResponse.count});
  } catch (e) {
    likeDispatch({type: 'setLikeCount', count: 0});
    console.log('get user like error', (e as Error).message);
  }
};

useEffect(() => {
  getLikes();
  getLikeCount();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [item]);

const handleLike = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    // If user has liked the media, delete the like. Otherwise, post the like.
    if (likeState.userLike) {
      // TODO: delete the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
      await deleteLike(likeState.userLike.like_id, token);
    } else {
      // TODO: post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
      await postLike(item.media_id, token);
    }
    getLikes();
    getLikeCount();
  } catch (e) {
    console.log('like error', (e as Error).message);
  }
};

  return(
    <>
     Like count: {likeState.count}
    {user ? (
      <>
        <button className="bg-slate-600 p-2 text-center hover:bg-slate-950" onClick={handleLike}> {likeState.userLike ? 'Unlike' : 'Like'} </button>
      </>
    ) : null}
    </>
  )
}

export default Likes;
