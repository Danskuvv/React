import {MediaItem} from '../types/DBTypes';
import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { fetchData } from '../functions';
const Home = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null); // adjust the initial state according to your needs

  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const json = await fetchData<MediaItem[]>('/~danielvv/hybrid-week3/test.json');
    setMediaArray(json);
  } catch (error) {
    console.error('getMedia', error);
  }
 };
 useEffect(() => {
  getMedia();
}, []);

 console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>
      {selectedItem && <SingleView item={selectedItem} setSelectedItem={(item: MediaItem | undefined) => setSelectedItem(item || null)} />}
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
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


