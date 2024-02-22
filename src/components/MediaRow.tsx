import { Link } from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import { useUserContext } from '../hooks/ContextHooks';
import Likes from './Likes';
// src/components/MediaRow.tsx

const MediaRow = (props: {item: MediaItemWithOwner, setSelectedItem: (item: MediaItemWithOwner) => void}) => {
  const {item} = props;
  const {user} = useUserContext();
  return (
    <tr className="p-4">
      <td className="flex items-center justify-center border border-slate-700">
      <img
          className="h-60 w-72 object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>
      <td className="p-4">{item.title}</td>
      <td className="p-4">{item.description}</td>
      <td className="p-4">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td className="p-4">{item.filesize}</td>
      <td className="p-4">{item.media_type}</td>
      <td className="p-4">{item.username}</td>
      <td>
        <Link to="/single" state={{item}} className="bg-slate-600 p-2 text-center hover:bg-slate-950">Show</Link>
        <Likes item={item} />


        {user &&
          (user.user_id === item.user_id || user.level_name === 'Admin') && (
            <>
              <button
                className="bg-slate-600 p-2 text-center hover:bg-slate-950"
                onClick={() => console.log('modify', item)}
              >
                Modify
              </button>
              <button
                className="bg-slate-600 p-2 text-center hover:bg-slate-950"
                onClick={() => console.log('delete', item)}
              >
                Delete
              </button>
            </>
          )}
      </td>
    </tr>
  );
};

export default MediaRow;
