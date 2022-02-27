import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useAppSelector } from '../../redux/hooks';
import { API_URL } from '../../utils/constants';

import '../Videos/videos.css';
import './history.css';

const History = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const fetchHistory = async () => {
    if (!user) {
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${API_URL}/user/history?userid=${user._id}`
      );
      setVideos(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, [user]);
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <Loading height="30px" width="30px" />
        </div>
      ) : !videos.length ? (
        <div className="page-center">
          <div className="no-history">No Video In History</div>
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', margin: '10px auto' }}>History</h2>
          <div className="video-container">
            {videos.map((video: any) => (
              <Link to={`/video/${video.videoId}`} key={video.videoId}>
                <article>
                  <img src={video.thumbnail} alt="" className="thumbnail" />
                  <div className="details">
                    <img src={video.channelProfilePicture} alt="" />
                    <div className="meta">
                      <div className="title">{`${video.title.slice(
                        0,
                        200
                      )}...`}</div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
