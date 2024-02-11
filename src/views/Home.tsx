import {MediaItemWithOwner} from '../types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { useMedia } from '../hooks/apiHooks';
const Home = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItemWithOwner | null>(null); // adjust the initial state according to your needs




  /*
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const json = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media');
    setMediaArray(json);
  } catch (error) {
    console.error('getMedia', error);
  }
 };
 useEffect(() => {
  getMedia();
}, []);

 console.log(mediaArray);
 */
//_______________________________________________________

const {mediaArray} = useMedia();



  return (
    <>
      <h2>My Media</h2>
      {selectedItem && <SingleView item={selectedItem} setSelectedItem={(item: MediaItemWithOwner | undefined) => setSelectedItem(item || null)} />}
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} setSelectedItem={setSelectedItem} />
          ))}
        </tbody>
      </table>

    </>
  );
};
export default Home;


