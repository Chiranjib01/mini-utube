import axios from 'axios';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { storage } from '../../firebase/config';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showMessage } from '../../redux/slices/message';
import { API_URL } from '../../utils/constants';
import stringToArray from '../../utils/stringToArray';
import './uploadvideo.css';

const UploadVideo = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const dispatch = useAppDispatch();

  const onImageChange = async (e: any) => {
    if (!e?.target?.files || !e?.target?.files[0]) {
      return;
    }

    if (
      e?.target?.files[0].type === 'image/jpeg' ||
      e?.target?.files[0].type === 'image/jpg' ||
      e?.target?.files[0].type === 'image/png'
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setImageFile(e?.target?.result);
      };
    } else {
      dispatch(
        showMessage({
          text: 'Unsupported File',
          variant: 'error',
          timer: 3000,
        })
      );
    }
  };

  const onVideoChange = async (e: any) => {
    if (!e?.target?.files || !e?.target?.files[0]) {
      return;
    }
    if (e?.target?.files[0].type === 'video/mp4') {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setFile(e?.target?.result);
      };
    } else {
      dispatch(
        showMessage({
          text: 'Unsupported File',
          variant: 'error',
          timer: 3000,
        })
      );
    }
  };

  const uploadThumbnail = async () => {
    if (!imageFile) {
      dispatch(
        showMessage({
          text: 'Select a File',
          variant: 'error',
          timer: 3000,
        })
      );
      return;
    }
    // upload to firebase
    try {
      setIsImageUploading(true);
      const storageRef = ref(storage, `videos/thumbnail/image-${Date.now()}`);
      await uploadString(storageRef, imageFile, 'data_url');
      const url = await getDownloadURL(storageRef);
      setThumbnail(url);
      dispatch(
        showMessage({
          text: 'Thumbnail Uploaded',
          variant: 'success',
          timer: 3000,
        })
      );
      setIsImageUploading(false);
    } catch (err) {
      setIsImageUploading(false);
      dispatch(
        showMessage({
          text: 'Something Went Wrong',
          variant: 'error',
          timer: 3000,
        })
      );
    }
  };

  const uploadVideo = async () => {
    if (!file) {
      dispatch(
        showMessage({
          text: 'Select a File',
          variant: 'error',
          timer: 3000,
        })
      );
      return;
    }
    // upload to firebase
    try {
      setIsUploading(true);
      const storageRef = ref(storage, `videos/video/video-${Date.now()}`);
      await uploadString(storageRef, file, 'data_url');
      const url = await getDownloadURL(storageRef);
      setUrl(url);
      dispatch(
        showMessage({
          text: 'Video Uploaded',
          variant: 'success',
          timer: 3000,
        })
      );
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      dispatch(
        showMessage({
          text: 'Something Went Wrong',
          variant: 'error',
          timer: 3000,
        })
      );
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(user);
    if (loading) {
      return;
    }
    if (!user) {
      return;
    }
    if (
      !title.trim() ||
      !description.trim() ||
      !thumbnail ||
      !url ||
      !tags.trim() ||
      !user._id
    ) {
      dispatch(
        showMessage({
          text: 'All fiels are required',
          variant: 'error',
          timer: 3000,
        })
      );
      return;
    }
    // save video
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/video`, {
        title,
        description,
        url,
        thumbnail,
        tags: stringToArray(tags),
        userId: user._id,
        userName: user.name,
        userProfilePicture: user.profilePicture,
      });
      setLoading(false);
      setTitle('');
      setTags('');
      setUrl('');
      setThumbnail('');
      setDescription('');
      dispatch(
        showMessage({
          text: 'Video Published Successfully',
          variant: 'success',
          timer: 3000,
        })
      );
    } catch (err) {
      setLoading(false);
      dispatch(
        showMessage({
          text: 'Some error occured',
          variant: 'error',
          timer: 3000,
        })
      );
    }
  };

  return (
    <div className="upload-form-container">
      <h1>Upload Video</h1>
      <form onSubmit={submitHandler}>
        <div className="form-item">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            className="form-input"
            placeholder="Enter Title ..."
          />
        </div>
        <div className="form-item">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows={10}
            className="form-input"
            placeholder="Enter Description ..."
          />
        </div>
        <div className="form-item">
          <label htmlFor="tags">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            id="tags"
            type="text"
            className="form-input"
            placeholder="Enter tags Separated by , (comma)"
          />
        </div>
        {/* thumbnail */}
        <div className="form-item">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            onChange={onImageChange}
            id="thumbnail"
            type="file"
            className="form-input"
          />
        </div>
        <button
          type="button"
          className="upload-btn"
          onClick={uploadThumbnail}
          disabled={isImageUploading}
        >
          Upload
        </button>
        {isImageUploading && (
          <Loading height="20px" width="20px" className="inline-block" />
        )}
        {thumbnail && <span>Uploaded</span>}
        {/* video */}
        <div className="form-item">
          <label htmlFor="video">Video</label>
          <input
            onChange={onVideoChange}
            id="video"
            type="file"
            className="form-input"
          />
        </div>
        <button
          type="button"
          className="upload-btn"
          onClick={uploadVideo}
          disabled={isUploading || !file}
        >
          Upload
        </button>
        {isUploading && (
          <Loading height="20px" width="20px" className="inline-block" />
        )}
        {url && <span>Uploaded</span>}
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? <Loading height="20px" width="20px" /> : 'Publish'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
