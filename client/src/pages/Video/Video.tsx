import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useAppSelector } from '../../redux/hooks';
import { useGetVideosByIdQuery } from '../../redux/slices/videos';
import { API_URL } from '../../utils/constants';
import './video.css';

const Video = () => {
  const { videoId } = useParams();
  const { data: video, isLoading } = useGetVideosByIdQuery(videoId!);
  const { user } = useAppSelector((state) => state.user);
  const addToHistory = async () => {
    if (!user) {
      return;
    }
    if (!video) {
      return;
    }
    try {
      const { data } = await axios.post(
        `${API_URL}/user/history?userid=${user._id}`,
        {
          title: video.title,
          userId: user._id,
          videoId: video._id,
          channelProfilePicture: video.userProfilePicture,
          thumbnail: video.thumbnail,
        }
      );
    } catch (err) {
      //
    }
  };
  useEffect(() => {
    if (user) {
      addToHistory();
    }
  }, [video]);
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <Loading height="30px" width="30px" />
        </div>
      ) : !video ? (
        <div
          className="loading"
          style={{ marginLeft: '-30px', fontSize: '18px' }}
        >
          Video Not Found
        </div>
      ) : (
        <div className="video-player-container">
          <div className="video-player">
            <video
              src={video.url}
              poster={video.thumbnail}
              autoPlay={true}
              controls
            ></video>
            <div className="video-details">
              <div className="title">{video.title}</div>
              <div className="description">{video.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
