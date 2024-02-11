import {useLocation, useNavigate} from "react-router-dom";
//import {MediaItem} from "../types/DBTypes";
import {MediaItemWithOwner} from "../types/DBTypes";

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item: MediaItemWithOwner = state.item;

  return (
    <>
      <button onClick={() => navigate(-1)}>Close</button>
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
            <td>{item.username}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Single
