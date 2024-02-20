import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

// Upload.tsx
const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      // TODO: call postFile function (see below)
      const fileResult = await postFile(file, token);
      // TODO: call postMedia function (see below)
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult.message);
      // TODO: redirect to Home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h1 className="text-center">Upload</h1>
<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
  <div className="flex flex-col w-4/5">
    <label htmlFor="title" className="mt-2">Title</label>
    <input
      name="title"
      type="text"
      id="title"
      onChange={handleInputChange}
      className="mt-2 p-2 border border-gray-300 rounded"
    />
  </div>
  <div className="flex flex-col w-4/5">
    <label htmlFor="description" className="mt-2">Description</label>
    <textarea
      name="description"
      rows={5}
      id="description"
      onChange={handleInputChange}
      className="mt-2 p-2 border border-gray-300 rounded"
    ></textarea>
  </div>
  <div className="flex flex-col w-4/5">
    <label htmlFor="file" className="mt-2">File</label>
    <input
      name="file"
      type="file"
      id="file"
      accept="image/*, video/*"
      onChange={handleFileChange}
      className="mt-2"
    />
  </div>
  <img
    src={
      file
        ? URL.createObjectURL(file)
        : 'https://via.placeholder.com/200?text=Choose+image'
    }
    alt="preview"
    width="200"
    className="my-2 rounded"
  />
  <button
    type="submit"
    disabled={file && inputs.title.length > 3 ? false : true}
    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Upload
  </button>
</form>
  </>
  );
};

export default Upload;
