// SingleView.tsx
import {useEffect} from 'react';
import {MediaItem} from '../types/DBTypes';

const SingleView = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;

  useEffect(() => {
    // Disable scroll when the component mounts (dialog opens)
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts (dialog closes)
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  return (
    <dialog open>
      <button onClick={() => setSelectedItem(undefined)}>Close</button>
      <table>
        <tbody>
          <tr>
            <td>
              {item.media_type === 'image/jpeg' && <img src={item.filename} alt={item.title} />}
              {item.media_type === 'video/mp4' && <video controls src={item.filename} />}
            </td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
            <td>{item.filesize}</td>
            <td>{item.media_type}</td>
          </tr>
        </tbody>
      </table>
    </dialog>
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
  );
};
export default SingleView;
