import { useParams } from 'react-router-dom';
import './video.css';

const Video = () => {
  const { videoId } = useParams();
  return <div>{videoId}</div>;
};

export default Video;
