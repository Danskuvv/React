import {useLocation, useNavigate} from "react-router-dom";
//import {MediaItem} from "../types/DBTypes";
import {MediaItemWithOwner} from "../types/DBTypes";
import Likes from "../components/Likes";

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item: MediaItemWithOwner = state.item;

  return (
    <>
      <button onClick={() => navigate(-1)} className="bg-slate-600 p-2 text-center hover:bg-slate-950">Close</button>
      <table>
        <tbody>
          <tr className="p-4">
            <td className="flex items-center justify-center border border-slate-700">
              {item.media_type === 'image/jpeg' && <img src={item.filename} alt={item.title} className="h-60 w-72 object-cover" />}
              {item.media_type === 'video/mp4' && <video controls src={item.filename} className="h-60 w-72 object-cover"/>}
            </td>
            <td className="p-4">{item.title}</td>
            <td className="p-4">{item.description}</td>
            <td className="p-4">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
            <td className="p-4">{item.filesize}</td>
            <td className="p-4">{item.media_type}</td>
            <td className="p-4">{item.username}</td>
            <Likes item={item}/>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Single
